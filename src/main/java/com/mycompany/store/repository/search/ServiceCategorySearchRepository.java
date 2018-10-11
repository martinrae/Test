package com.mycompany.store.repository.search;

import com.mycompany.store.domain.ServiceCategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ServiceCategory entity.
 */
public interface ServiceCategorySearchRepository extends ElasticsearchRepository<ServiceCategory, Long> {
}
