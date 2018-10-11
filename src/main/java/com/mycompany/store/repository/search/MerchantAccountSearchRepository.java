package com.mycompany.store.repository.search;

import com.mycompany.store.domain.MerchantAccount;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MerchantAccount entity.
 */
public interface MerchantAccountSearchRepository extends ElasticsearchRepository<MerchantAccount, Long> {
}
