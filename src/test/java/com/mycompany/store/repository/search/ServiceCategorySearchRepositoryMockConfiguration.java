package com.mycompany.store.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ServiceCategorySearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ServiceCategorySearchRepositoryMockConfiguration {

    @MockBean
    private ServiceCategorySearchRepository mockServiceCategorySearchRepository;

}
