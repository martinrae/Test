package com.mycompany.store.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ResourceSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ResourceSearchRepositoryMockConfiguration {

    @MockBean
    private ResourceSearchRepository mockResourceSearchRepository;

}
