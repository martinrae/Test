package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.Bill;
import com.mycompany.store.repository.BillRepository;
import com.mycompany.store.repository.search.BillSearchRepository;
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
 * REST controller for managing Bill.
 */
@RestController
@RequestMapping("/api")
public class BillResource {

    private final Logger log = LoggerFactory.getLogger(BillResource.class);

    private static final String ENTITY_NAME = "bill";

    private final BillRepository billRepository;

    private final BillSearchRepository billSearchRepository;

    public BillResource(BillRepository billRepository, BillSearchRepository billSearchRepository) {
        this.billRepository = billRepository;
        this.billSearchRepository = billSearchRepository;
    }

    /**
     * POST  /bills : Create a new bill.
     *
     * @param bill the bill to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bill, or with status 400 (Bad Request) if the bill has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bills")
    @Timed
    public ResponseEntity<Bill> createBill(@Valid @RequestBody Bill bill) throws URISyntaxException {
        log.debug("REST request to save Bill : {}", bill);
        if (bill.getId() != null) {
            throw new BadRequestAlertException("A new bill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bill result = billRepository.save(bill);
        billSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bills : Updates an existing bill.
     *
     * @param bill the bill to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bill,
     * or with status 400 (Bad Request) if the bill is not valid,
     * or with status 500 (Internal Server Error) if the bill couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bills")
    @Timed
    public ResponseEntity<Bill> updateBill(@Valid @RequestBody Bill bill) throws URISyntaxException {
        log.debug("REST request to update Bill : {}", bill);
        if (bill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bill result = billRepository.save(bill);
        billSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bill.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bills : get all the bills.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of bills in body
     */
    @GetMapping("/bills")
    @Timed
    public List<Bill> getAllBills(@RequestParam(required = false) String filter) {
        if ("booking-is-null".equals(filter)) {
            log.debug("REST request to get all Bills where booking is null");
            return StreamSupport
                .stream(billRepository.findAll().spliterator(), false)
                .filter(bill -> bill.getBooking() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Bills");
        return billRepository.findAll();
    }

    /**
     * GET  /bills/:id : get the "id" bill.
     *
     * @param id the id of the bill to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bill, or with status 404 (Not Found)
     */
    @GetMapping("/bills/{id}")
    @Timed
    public ResponseEntity<Bill> getBill(@PathVariable Long id) {
        log.debug("REST request to get Bill : {}", id);
        Optional<Bill> bill = billRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bill);
    }

    /**
     * DELETE  /bills/:id : delete the "id" bill.
     *
     * @param id the id of the bill to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bills/{id}")
    @Timed
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        log.debug("REST request to delete Bill : {}", id);

        billRepository.deleteById(id);
        billSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/bills?query=:query : search for the bill corresponding
     * to the query.
     *
     * @param query the query of the bill search
     * @return the result of the search
     */
    @GetMapping("/_search/bills")
    @Timed
    public List<Bill> searchBills(@RequestParam String query) {
        log.debug("REST request to search Bills for query {}", query);
        return StreamSupport
            .stream(billSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
