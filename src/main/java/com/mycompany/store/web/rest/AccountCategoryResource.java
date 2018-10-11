package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.AccountCategory;
import com.mycompany.store.repository.AccountCategoryRepository;
import com.mycompany.store.repository.search.AccountCategorySearchRepository;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;
import com.mycompany.store.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing AccountCategory.
 */
@RestController
@RequestMapping("/api")
public class AccountCategoryResource {

    private final Logger log = LoggerFactory.getLogger(AccountCategoryResource.class);

    private static final String ENTITY_NAME = "accountCategory";

    private final AccountCategoryRepository accountCategoryRepository;

    private final AccountCategorySearchRepository accountCategorySearchRepository;

    public AccountCategoryResource(AccountCategoryRepository accountCategoryRepository, AccountCategorySearchRepository accountCategorySearchRepository) {
        this.accountCategoryRepository = accountCategoryRepository;
        this.accountCategorySearchRepository = accountCategorySearchRepository;
    }

    /**
     * POST  /account-categories : Create a new accountCategory.
     *
     * @param accountCategory the accountCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountCategory, or with status 400 (Bad Request) if the accountCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/account-categories")
    @Timed
    public ResponseEntity<AccountCategory> createAccountCategory(@Valid @RequestBody AccountCategory accountCategory) throws URISyntaxException {
        log.debug("REST request to save AccountCategory : {}", accountCategory);
        if (accountCategory.getId() != null) {
            throw new BadRequestAlertException("A new accountCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountCategory result = accountCategoryRepository.save(accountCategory);
        accountCategorySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/account-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /account-categories : Updates an existing accountCategory.
     *
     * @param accountCategory the accountCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountCategory,
     * or with status 400 (Bad Request) if the accountCategory is not valid,
     * or with status 500 (Internal Server Error) if the accountCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/account-categories")
    @Timed
    public ResponseEntity<AccountCategory> updateAccountCategory(@Valid @RequestBody AccountCategory accountCategory) throws URISyntaxException {
        log.debug("REST request to update AccountCategory : {}", accountCategory);
        if (accountCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountCategory result = accountCategoryRepository.save(accountCategory);
        accountCategorySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /account-categories : get all the accountCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accountCategories in body
     */
    @GetMapping("/account-categories")
    @Timed
    public List<AccountCategory> getAllAccountCategories() {
        log.debug("REST request to get all AccountCategories");
        return accountCategoryRepository.findAll();
    }

    /**
     * GET  /account-categories/:id : get the "id" accountCategory.
     *
     * @param id the id of the accountCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountCategory, or with status 404 (Not Found)
     */
    @GetMapping("/account-categories/{id}")
    @Timed
    public ResponseEntity<AccountCategory> getAccountCategory(@PathVariable Long id) {
        log.debug("REST request to get AccountCategory : {}", id);
        Optional<AccountCategory> accountCategory = accountCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountCategory);
    }

    /**
     * DELETE  /account-categories/:id : delete the "id" accountCategory.
     *
     * @param id the id of the accountCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/account-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountCategory(@PathVariable Long id) {
        log.debug("REST request to delete AccountCategory : {}", id);

        accountCategoryRepository.deleteById(id);
        accountCategorySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/account-categories?query=:query : search for the accountCategory corresponding
     * to the query.
     *
     * @param query the query of the accountCategory search
     * @return the result of the search
     */
    @GetMapping("/_search/account-categories")
    @Timed
    public List<AccountCategory> searchAccountCategories(@RequestParam String query) {
        log.debug("REST request to search AccountCategories for query {}", query);
        return StreamSupport
            .stream(accountCategorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
