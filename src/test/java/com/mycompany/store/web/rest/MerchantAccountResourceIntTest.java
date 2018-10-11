package com.mycompany.store.web.rest;

import com.mycompany.store.YaldayApp;

import com.mycompany.store.domain.MerchantAccount;
import com.mycompany.store.repository.MerchantAccountRepository;
import com.mycompany.store.repository.search.MerchantAccountSearchRepository;
import com.mycompany.store.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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
 * Test class for the MerchantAccountResource REST controller.
 *
 * @see MerchantAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YaldayApp.class)
public class MerchantAccountResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PROFILE_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PROFILE_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_IMAGE_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_OPEN_MONDAY = false;
    private static final Boolean UPDATED_OPEN_MONDAY = true;

    private static final Boolean DEFAULT_OPEN_TUESDAY = false;
    private static final Boolean UPDATED_OPEN_TUESDAY = true;

    private static final Boolean DEFAULT_OPEN_WEDNESDAY = false;
    private static final Boolean UPDATED_OPEN_WEDNESDAY = true;

    private static final Boolean DEFAULT_OPEN_THURSDAY = false;
    private static final Boolean UPDATED_OPEN_THURSDAY = true;

    private static final Boolean DEFAULT_OPEN_FRIDAY = false;
    private static final Boolean UPDATED_OPEN_FRIDAY = true;

    private static final Boolean DEFAULT_OPEN_SATURDAY = false;
    private static final Boolean UPDATED_OPEN_SATURDAY = true;

    private static final Boolean DEFAULT_OPEN_SUNDAY = false;
    private static final Boolean UPDATED_OPEN_SUNDAY = true;

    @Autowired
    private MerchantAccountRepository merchantAccountRepository;
    @Mock
    private MerchantAccountRepository merchantAccountRepositoryMock;

    /**
     * This repository is mocked in the com.mycompany.store.repository.search test package.
     *
     * @see com.mycompany.store.repository.search.MerchantAccountSearchRepositoryMockConfiguration
     */
    @Autowired
    private MerchantAccountSearchRepository mockMerchantAccountSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMerchantAccountMockMvc;

    private MerchantAccount merchantAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MerchantAccountResource merchantAccountResource = new MerchantAccountResource(merchantAccountRepository, mockMerchantAccountSearchRepository);
        this.restMerchantAccountMockMvc = MockMvcBuilders.standaloneSetup(merchantAccountResource)
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
    public static MerchantAccount createEntity(EntityManager em) {
        MerchantAccount merchantAccount = new MerchantAccount()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .profileImage(DEFAULT_PROFILE_IMAGE)
            .profileImageContentType(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)
            .openMonday(DEFAULT_OPEN_MONDAY)
            .openTuesday(DEFAULT_OPEN_TUESDAY)
            .openWednesday(DEFAULT_OPEN_WEDNESDAY)
            .openThursday(DEFAULT_OPEN_THURSDAY)
            .openFriday(DEFAULT_OPEN_FRIDAY)
            .openSaturday(DEFAULT_OPEN_SATURDAY)
            .openSunday(DEFAULT_OPEN_SUNDAY);
        return merchantAccount;
    }

    @Before
    public void initTest() {
        merchantAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createMerchantAccount() throws Exception {
        int databaseSizeBeforeCreate = merchantAccountRepository.findAll().size();

        // Create the MerchantAccount
        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isCreated());

        // Validate the MerchantAccount in the database
        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeCreate + 1);
        MerchantAccount testMerchantAccount = merchantAccountList.get(merchantAccountList.size() - 1);
        assertThat(testMerchantAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMerchantAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMerchantAccount.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testMerchantAccount.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testMerchantAccount.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testMerchantAccount.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testMerchantAccount.getProfileImage()).isEqualTo(DEFAULT_PROFILE_IMAGE);
        assertThat(testMerchantAccount.getProfileImageContentType()).isEqualTo(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE);
        assertThat(testMerchantAccount.isOpenMonday()).isEqualTo(DEFAULT_OPEN_MONDAY);
        assertThat(testMerchantAccount.isOpenTuesday()).isEqualTo(DEFAULT_OPEN_TUESDAY);
        assertThat(testMerchantAccount.isOpenWednesday()).isEqualTo(DEFAULT_OPEN_WEDNESDAY);
        assertThat(testMerchantAccount.isOpenThursday()).isEqualTo(DEFAULT_OPEN_THURSDAY);
        assertThat(testMerchantAccount.isOpenFriday()).isEqualTo(DEFAULT_OPEN_FRIDAY);
        assertThat(testMerchantAccount.isOpenSaturday()).isEqualTo(DEFAULT_OPEN_SATURDAY);
        assertThat(testMerchantAccount.isOpenSunday()).isEqualTo(DEFAULT_OPEN_SUNDAY);

        // Validate the MerchantAccount in Elasticsearch
        verify(mockMerchantAccountSearchRepository, times(1)).save(testMerchantAccount);
    }

    @Test
    @Transactional
    public void createMerchantAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = merchantAccountRepository.findAll().size();

        // Create the MerchantAccount with an existing ID
        merchantAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        // Validate the MerchantAccount in the database
        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeCreate);

        // Validate the MerchantAccount in Elasticsearch
        verify(mockMerchantAccountSearchRepository, times(0)).save(merchantAccount);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setName(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setDescription(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressLine1IsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setAddressLine1(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setCity(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setCountry(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenMondayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenMonday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenTuesdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenTuesday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenWednesdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenWednesday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenThursdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenThursday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenFridayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenFriday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenSaturdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenSaturday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenSundayIsRequired() throws Exception {
        int databaseSizeBeforeTest = merchantAccountRepository.findAll().size();
        // set the field null
        merchantAccount.setOpenSunday(null);

        // Create the MerchantAccount, which fails.

        restMerchantAccountMockMvc.perform(post("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMerchantAccounts() throws Exception {
        // Initialize the database
        merchantAccountRepository.saveAndFlush(merchantAccount);

        // Get all the merchantAccountList
        restMerchantAccountMockMvc.perform(get("/api/merchant-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(merchantAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))))
            .andExpect(jsonPath("$.[*].openMonday").value(hasItem(DEFAULT_OPEN_MONDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openTuesday").value(hasItem(DEFAULT_OPEN_TUESDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openWednesday").value(hasItem(DEFAULT_OPEN_WEDNESDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openThursday").value(hasItem(DEFAULT_OPEN_THURSDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openFriday").value(hasItem(DEFAULT_OPEN_FRIDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openSaturday").value(hasItem(DEFAULT_OPEN_SATURDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openSunday").value(hasItem(DEFAULT_OPEN_SUNDAY.booleanValue())));
    }
    
    public void getAllMerchantAccountsWithEagerRelationshipsIsEnabled() throws Exception {
        MerchantAccountResource merchantAccountResource = new MerchantAccountResource(merchantAccountRepositoryMock, mockMerchantAccountSearchRepository);
        when(merchantAccountRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMerchantAccountMockMvc = MockMvcBuilders.standaloneSetup(merchantAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMerchantAccountMockMvc.perform(get("/api/merchant-accounts?eagerload=true"))
        .andExpect(status().isOk());

        verify(merchantAccountRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllMerchantAccountsWithEagerRelationshipsIsNotEnabled() throws Exception {
        MerchantAccountResource merchantAccountResource = new MerchantAccountResource(merchantAccountRepositoryMock, mockMerchantAccountSearchRepository);
            when(merchantAccountRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMerchantAccountMockMvc = MockMvcBuilders.standaloneSetup(merchantAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMerchantAccountMockMvc.perform(get("/api/merchant-accounts?eagerload=true"))
        .andExpect(status().isOk());

            verify(merchantAccountRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMerchantAccount() throws Exception {
        // Initialize the database
        merchantAccountRepository.saveAndFlush(merchantAccount);

        // Get the merchantAccount
        restMerchantAccountMockMvc.perform(get("/api/merchant-accounts/{id}", merchantAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(merchantAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1.toString()))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.profileImageContentType").value(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profileImage").value(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE)))
            .andExpect(jsonPath("$.openMonday").value(DEFAULT_OPEN_MONDAY.booleanValue()))
            .andExpect(jsonPath("$.openTuesday").value(DEFAULT_OPEN_TUESDAY.booleanValue()))
            .andExpect(jsonPath("$.openWednesday").value(DEFAULT_OPEN_WEDNESDAY.booleanValue()))
            .andExpect(jsonPath("$.openThursday").value(DEFAULT_OPEN_THURSDAY.booleanValue()))
            .andExpect(jsonPath("$.openFriday").value(DEFAULT_OPEN_FRIDAY.booleanValue()))
            .andExpect(jsonPath("$.openSaturday").value(DEFAULT_OPEN_SATURDAY.booleanValue()))
            .andExpect(jsonPath("$.openSunday").value(DEFAULT_OPEN_SUNDAY.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMerchantAccount() throws Exception {
        // Get the merchantAccount
        restMerchantAccountMockMvc.perform(get("/api/merchant-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMerchantAccount() throws Exception {
        // Initialize the database
        merchantAccountRepository.saveAndFlush(merchantAccount);

        int databaseSizeBeforeUpdate = merchantAccountRepository.findAll().size();

        // Update the merchantAccount
        MerchantAccount updatedMerchantAccount = merchantAccountRepository.findById(merchantAccount.getId()).get();
        // Disconnect from session so that the updates on updatedMerchantAccount are not directly saved in db
        em.detach(updatedMerchantAccount);
        updatedMerchantAccount
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .profileImage(UPDATED_PROFILE_IMAGE)
            .profileImageContentType(UPDATED_PROFILE_IMAGE_CONTENT_TYPE)
            .openMonday(UPDATED_OPEN_MONDAY)
            .openTuesday(UPDATED_OPEN_TUESDAY)
            .openWednesday(UPDATED_OPEN_WEDNESDAY)
            .openThursday(UPDATED_OPEN_THURSDAY)
            .openFriday(UPDATED_OPEN_FRIDAY)
            .openSaturday(UPDATED_OPEN_SATURDAY)
            .openSunday(UPDATED_OPEN_SUNDAY);

        restMerchantAccountMockMvc.perform(put("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMerchantAccount)))
            .andExpect(status().isOk());

        // Validate the MerchantAccount in the database
        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeUpdate);
        MerchantAccount testMerchantAccount = merchantAccountList.get(merchantAccountList.size() - 1);
        assertThat(testMerchantAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMerchantAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMerchantAccount.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testMerchantAccount.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testMerchantAccount.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testMerchantAccount.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testMerchantAccount.getProfileImage()).isEqualTo(UPDATED_PROFILE_IMAGE);
        assertThat(testMerchantAccount.getProfileImageContentType()).isEqualTo(UPDATED_PROFILE_IMAGE_CONTENT_TYPE);
        assertThat(testMerchantAccount.isOpenMonday()).isEqualTo(UPDATED_OPEN_MONDAY);
        assertThat(testMerchantAccount.isOpenTuesday()).isEqualTo(UPDATED_OPEN_TUESDAY);
        assertThat(testMerchantAccount.isOpenWednesday()).isEqualTo(UPDATED_OPEN_WEDNESDAY);
        assertThat(testMerchantAccount.isOpenThursday()).isEqualTo(UPDATED_OPEN_THURSDAY);
        assertThat(testMerchantAccount.isOpenFriday()).isEqualTo(UPDATED_OPEN_FRIDAY);
        assertThat(testMerchantAccount.isOpenSaturday()).isEqualTo(UPDATED_OPEN_SATURDAY);
        assertThat(testMerchantAccount.isOpenSunday()).isEqualTo(UPDATED_OPEN_SUNDAY);

        // Validate the MerchantAccount in Elasticsearch
        verify(mockMerchantAccountSearchRepository, times(1)).save(testMerchantAccount);
    }

    @Test
    @Transactional
    public void updateNonExistingMerchantAccount() throws Exception {
        int databaseSizeBeforeUpdate = merchantAccountRepository.findAll().size();

        // Create the MerchantAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restMerchantAccountMockMvc.perform(put("/api/merchant-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(merchantAccount)))
            .andExpect(status().isBadRequest());

        // Validate the MerchantAccount in the database
        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MerchantAccount in Elasticsearch
        verify(mockMerchantAccountSearchRepository, times(0)).save(merchantAccount);
    }

    @Test
    @Transactional
    public void deleteMerchantAccount() throws Exception {
        // Initialize the database
        merchantAccountRepository.saveAndFlush(merchantAccount);

        int databaseSizeBeforeDelete = merchantAccountRepository.findAll().size();

        // Get the merchantAccount
        restMerchantAccountMockMvc.perform(delete("/api/merchant-accounts/{id}", merchantAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MerchantAccount> merchantAccountList = merchantAccountRepository.findAll();
        assertThat(merchantAccountList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MerchantAccount in Elasticsearch
        verify(mockMerchantAccountSearchRepository, times(1)).deleteById(merchantAccount.getId());
    }

    @Test
    @Transactional
    public void searchMerchantAccount() throws Exception {
        // Initialize the database
        merchantAccountRepository.saveAndFlush(merchantAccount);
        when(mockMerchantAccountSearchRepository.search(queryStringQuery("id:" + merchantAccount.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(merchantAccount), PageRequest.of(0, 1), 1));
        // Search the merchantAccount
        restMerchantAccountMockMvc.perform(get("/api/_search/merchant-accounts?query=id:" + merchantAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(merchantAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].profileImageContentType").value(hasItem(DEFAULT_PROFILE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profileImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_IMAGE))))
            .andExpect(jsonPath("$.[*].openMonday").value(hasItem(DEFAULT_OPEN_MONDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openTuesday").value(hasItem(DEFAULT_OPEN_TUESDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openWednesday").value(hasItem(DEFAULT_OPEN_WEDNESDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openThursday").value(hasItem(DEFAULT_OPEN_THURSDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openFriday").value(hasItem(DEFAULT_OPEN_FRIDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openSaturday").value(hasItem(DEFAULT_OPEN_SATURDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].openSunday").value(hasItem(DEFAULT_OPEN_SUNDAY.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MerchantAccount.class);
        MerchantAccount merchantAccount1 = new MerchantAccount();
        merchantAccount1.setId(1L);
        MerchantAccount merchantAccount2 = new MerchantAccount();
        merchantAccount2.setId(merchantAccount1.getId());
        assertThat(merchantAccount1).isEqualTo(merchantAccount2);
        merchantAccount2.setId(2L);
        assertThat(merchantAccount1).isNotEqualTo(merchantAccount2);
        merchantAccount1.setId(null);
        assertThat(merchantAccount1).isNotEqualTo(merchantAccount2);
    }
}
