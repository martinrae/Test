package com.mycompany.store.repository.search;

import com.mycompany.store.domain.Bill;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Bill entity.
 */
public interface BillSearchRepository extends ElasticsearchRepository<Bill, Long> {
}
