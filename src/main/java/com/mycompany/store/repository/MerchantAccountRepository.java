package com.mycompany.store.repository;

import com.mycompany.store.domain.MerchantAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the MerchantAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MerchantAccountRepository extends JpaRepository<MerchantAccount, Long> {

    @Query(value = "select distinct merchant_account from MerchantAccount merchant_account left join fetch merchant_account.accountCategories",
        countQuery = "select count(distinct merchant_account) from MerchantAccount merchant_account")
    Page<MerchantAccount> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct merchant_account from MerchantAccount merchant_account left join fetch merchant_account.accountCategories")
    List<MerchantAccount> findAllWithEagerRelationships();

    @Query("select merchant_account from MerchantAccount merchant_account left join fetch merchant_account.accountCategories where merchant_account.id =:id")
    Optional<MerchantAccount> findOneWithEagerRelationships(@Param("id") Long id);

}
