package com.mycompany.store.repository;

import com.mycompany.store.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "select distinct review from Review review left join fetch review.contacts left join fetch review.merchantAccounts",
        countQuery = "select count(distinct review) from Review review")
    Page<Review> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct review from Review review left join fetch review.contacts left join fetch review.merchantAccounts")
    List<Review> findAllWithEagerRelationships();

    @Query("select review from Review review left join fetch review.contacts left join fetch review.merchantAccounts where review.id =:id")
    Optional<Review> findOneWithEagerRelationships(@Param("id") Long id);

}
