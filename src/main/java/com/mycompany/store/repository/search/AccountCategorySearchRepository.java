package com.mycompany.store.repository.search;

import com.mycompany.store.domain.AccountCategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AccountCategory entity.
 */
public interface AccountCategorySearchRepository extends ElasticsearchRepository<AccountCategory, Long> {
}
