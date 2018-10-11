package com.mycompany.store.repository;

import com.mycompany.store.domain.AccountCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AccountCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCategoryRepository extends JpaRepository<AccountCategory, Long> {

}
