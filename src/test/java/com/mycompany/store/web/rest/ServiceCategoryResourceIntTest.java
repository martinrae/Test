package com.mycompany.store.web.rest;

import com.mycompany.store.YaldayApp;

import com.mycompany.store.domain.ServiceCategory;
import com.mycompany.store.repository.ServiceCategoryRepository;
import com.mycompany.store.repository.search.ServiceCategorySearchRepository;
import com.mycompany.store.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.mycompany.store.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServiceCategoryResource REST controller.
 *
 * @see ServiceCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YaldayApp.class)
public class ServiceCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PROFILE_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PROFILE_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private ServiceCategoryRepository serviceCategoryRepository;


    /**
     * This repository is mocked in the com.mycompany.store.repository.search test package.
     *
     * @see com.mycompany.store.repository.search.ServiceCategorySearchRepositoryMockConfiguration
     */
    @Autowired
    private ServiceCategorySearchRepository mockServiceCategorySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceCategoryMockMvc;

    private ServiceCategory serviceCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceCategoryResource serviceCategoryResource = new ServiceCategoryResource(serviceCategoryRepository, mockServiceCategorySearchRepository);
        this.restServiceCategoryMockMvc = MockMvcBuilders.standaloneSetup(serviceCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceCategory createEntity(EntityManager em) {
        ServiceCategory serviceCategory = new ServiceCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .profileImage(DEFAULT_PROFILE_IMAGE)
            .profileImageContentType(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);
        return serviceCategory;
    }

    @Before
    public void initTest() {
        serviceCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceCategory() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isCreated());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testServiceCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testServiceCategory.getProfileImage()).isEqualTo(DEFAULT_PROFILE_IMAGE);
        assertThat(testServiceCategory.getProfileImageContentType()).isEqualTo(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);

        // Validate the ServiceCategory in Elasticsearch
        verify(mockServiceCategorySearchRepository, times(1)).save(testServiceCategory);
    }

    @Test
    @Transactional
    public void createServiceCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory with an existing ID
        serviceCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the ServiceCategory in Elasticsearch
        verify(mockServiceCategorySearchRepository, times(0)).save(serviceCategory);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceCategoryRepository.findAll().size();
        // set the field null
        serviceCategory.setName(null);

        // Create the ServiceCategory, which fails.

        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isBadRequest());

        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllServiceCategories() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get all the serviceCategoryList
        restServiceCategoryMockMvc.perform(get("/api/service-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))));
    }
    

    @Test
    @Transactional
    public void getServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", serviceCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.profileImageContentType").value(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profileImage").value(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE)));
    }
    @Test
    @Transactional
    public void getNonExistingServiceCategory() throws Exception {
        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Update the serviceCategory
        ServiceCategory updatedServiceCategory = serviceCategoryRepository.findById(serviceCategory.getId()).get();
        // Disconnect from session so that the updates on updatedServiceCategory are not directly saved in db
        em.detach(updatedServiceCategory);
        updatedServiceCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .profileImage(UPDATED_PROFILE_IMAGE)
            .profileImageContentType(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);

        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceCategory)))
            .andExpect(status().isOk());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testServiceCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testServiceCategory.getProfileImage()).isEqualTo(UPDATED_PROFILE_IMAGE);
        assertThat(testServiceCategory.getProfileImageContentType()).isEqualTo(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);

        // Validate the ServiceCategory in Elasticsearch
        verify(mockServiceCategorySearchRepository, times(1)).save(testServiceCategory);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceCategory() throws Exception {
        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ServiceCategory in Elasticsearch
        verify(mockServiceCategorySearchRepository, times(0)).save(serviceCategory);
    }

    @Test
    @Transactional
    public void deleteServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        int databaseSizeBeforeDelete = serviceCategoryRepository.findAll().size();

        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(delete("/api/service-categories/{id}", serviceCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ServiceCategory in Elasticsearch
        verify(mockServiceCategorySearchRepository, times(1)).deleteById(serviceCategory.getId());
    }

    @Test
    @Transactional
    public void searchServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);
        when(mockServiceCategorySearchRepository.search(queryStringQuery("id:" + serviceCategory.getId())))
            .thenReturn(Collections.singletonList(serviceCategory));
        // Search the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/_search/service-categories?query=id:" + serviceCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceCategory.class);
        ServiceCategory serviceCategory1 = new ServiceCategory();
        serviceCategory1.setId(1L);
        ServiceCategory serviceCategory2 = new ServiceCategory();
        serviceCategory2.setId(serviceCategory1.getId());
        assertThat(serviceCategory1).isEqualTo(serviceCategory2);
        serviceCategory2.setId(2L);
        assertThat(serviceCategory1).isNotEqualTo(serviceCategory2);
        serviceCategory1.setId(null);
        assertThat(serviceCategory1).isNotEqualTo(serviceCategory2);
    }
}
