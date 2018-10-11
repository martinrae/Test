package com.mycompany.store.web.rest;

import com.mycompany.store.YaldayApp;

import com.mycompany.store.domain.AccountCategory;
import com.mycompany.store.repository.AccountCategoryRepository;
import com.mycompany.store.repository.search.AccountCategorySearchRepository;
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
 * Test class for the AccountCategoryResource REST controller.
 *
 * @see AccountCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YaldayApp.class)
public class AccountCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PROFILE_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PROFILE_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private AccountCategoryRepository accountCategoryRepository;


    /**
     * This repository is mocked in the com.mycompany.store.repository.search test package.
     *
     * @see com.mycompany.store.repository.search.AccountCategorySearchRepositoryMockConfiguration
     */
    @Autowired
    private AccountCategorySearchRepository mockAccountCategorySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccountCategoryMockMvc;

    private AccountCategory accountCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountCategoryResource accountCategoryResource = new AccountCategoryResource(accountCategoryRepository, mockAccountCategorySearchRepository);
        this.restAccountCategoryMockMvc = MockMvcBuilders.standaloneSetup(accountCategoryResource)
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
    public static AccountCategory createEntity(EntityManager em) {
        AccountCategory accountCategory = new AccountCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .profileImage(DEFAULT_PROFILE_IMAGE)
            .profileImageContentType(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);
        return accountCategory;
    }

    @Before
    public void initTest() {
        accountCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountCategory() throws Exception {
        int databaseSizeBeforeCreate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory
        restAccountCategoryMockMvc.perform(post("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isCreated());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        AccountCategory testAccountCategory = accountCategoryList.get(accountCategoryList.size() - 1);
        assertThat(testAccountCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAccountCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAccountCategory.getProfileImage()).isEqualTo(DEFAULT_PROFILE_IMAGE);
        assertThat(testAccountCategory.getProfileImageContentType()).isEqualTo(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);

        // Validate the AccountCategory in Elasticsearch
        verify(mockAccountCategorySearchRepository, times(1)).save(testAccountCategory);
    }

    @Test
    @Transactional
    public void createAccountCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory with an existing ID
        accountCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountCategoryMockMvc.perform(post("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the AccountCategory in Elasticsearch
        verify(mockAccountCategorySearchRepository, times(0)).save(accountCategory);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountCategoryRepository.findAll().size();
        // set the field null
        accountCategory.setName(null);

        // Create the AccountCategory, which fails.

        restAccountCategoryMockMvc.perform(post("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isBadRequest());

        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAccountCategories() throws Exception {
        // Initialize the database
        accountCategoryRepository.saveAndFlush(accountCategory);

        // Get all the accountCategoryList
        restAccountCategoryMockMvc.perform(get("/api/account-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))));
    }
    

    @Test
    @Transactional
    public void getAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryRepository.saveAndFlush(accountCategory);

        // Get the accountCategory
        restAccountCategoryMockMvc.perform(get("/api/account-categories/{id}", accountCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.profileImageContentType").value(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profileImage").value(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE)));
    }
    @Test
    @Transactional
    public void getNonExistingAccountCategory() throws Exception {
        // Get the accountCategory
        restAccountCategoryMockMvc.perform(get("/api/account-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryRepository.saveAndFlush(accountCategory);

        int databaseSizeBeforeUpdate = accountCategoryRepository.findAll().size();

        // Update the accountCategory
        AccountCategory updatedAccountCategory = accountCategoryRepository.findById(accountCategory.getId()).get();
        // Disconnect from session so that the updates on updatedAccountCategory are not directly saved in db
        em.detach(updatedAccountCategory);
        updatedAccountCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .profileImage(UPDATED_PROFILE_IMAGE)
            .profileImageContentType(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);

        restAccountCategoryMockMvc.perform(put("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountCategory)))
            .andExpect(status().isOk());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeUpdate);
        AccountCategory testAccountCategory = accountCategoryList.get(accountCategoryList.size() - 1);
        assertThat(testAccountCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccountCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAccountCategory.getProfileImage()).isEqualTo(UPDATED_PROFILE_IMAGE);
        assertThat(testAccountCategory.getProfileImageContentType()).isEqualTo(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);

        // Validate the AccountCategory in Elasticsearch
        verify(mockAccountCategorySearchRepository, times(1)).save(testAccountCategory);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountCategory() throws Exception {
        int databaseSizeBeforeUpdate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restAccountCategoryMockMvc.perform(put("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AccountCategory in Elasticsearch
        verify(mockAccountCategorySearchRepository, times(0)).save(accountCategory);
    }

    @Test
    @Transactional
    public void deleteAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryRepository.saveAndFlush(accountCategory);

        int databaseSizeBeforeDelete = accountCategoryRepository.findAll().size();

        // Get the accountCategory
        restAccountCategoryMockMvc.perform(delete("/api/account-categories/{id}", accountCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AccountCategory in Elasticsearch
        verify(mockAccountCategorySearchRepository, times(1)).deleteById(accountCategory.getId());
    }

    @Test
    @Transactional
    public void searchAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryRepository.saveAndFlush(accountCategory);
        when(mockAccountCategorySearchRepository.search(queryStringQuery("id:" + accountCategory.getId())))
            .thenReturn(Collections.singletonList(accountCategory));
        // Search the accountCategory
        restAccountCategoryMockMvc.perform(get("/api/_search/account-categories?query=id:" + accountCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountCategory.class);
        AccountCategory accountCategory1 = new AccountCategory();
        accountCategory1.setId(1L);
        AccountCategory accountCategory2 = new AccountCategory();
        accountCategory2.setId(accountCategory1.getId());
        assertThat(accountCategory1).isEqualTo(accountCategory2);
        accountCategory2.setId(2L);
        assertThat(accountCategory1).isNotEqualTo(accountCategory2);
        accountCategory1.setId(null);
        assertThat(accountCategory1).isNotEqualTo(accountCategory2);
    }
}
