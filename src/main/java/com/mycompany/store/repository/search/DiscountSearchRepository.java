package com.mycompany.store.repository.search;

import com.mycompany.store.domain.Discount;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Discount entity.
 */
public interface DiscountSearchRepository extends ElasticsearchRepository<Discount, Long> {
}
