package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.Review;
import com.mycompany.store.repository.ReviewRepository;
import com.mycompany.store.repository.search.ReviewSearchRepository;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;
import com.mycompany.store.web.rest.util.HeaderUtil;
import com.mycompany.store.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
 * REST controller for managing Review.
 */
@RestController
@RequestMapping("/api")
public class ReviewResource {

    private final Logger log = LoggerFactory.getLogger(ReviewResource.class);

    private static final String ENTITY_NAME = "review";

    private final ReviewRepository reviewRepository;

    private final ReviewSearchRepository reviewSearchRepository;

    public ReviewResource(ReviewRepository reviewRepository, ReviewSearchRepository reviewSearchRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewSearchRepository = reviewSearchRepository;
    }

    /**
     * POST  /reviews : Create a new review.
     *
     * @param review the review to create
     * @return the ResponseEntity with status 201 (Created) and with body the new review, or with status 400 (Bad Request) if the review has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reviews")
    @Timed
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review) throws URISyntaxException {
        log.debug("REST request to save Review : {}", review);
        if (review.getId() != null) {
            throw new BadRequestAlertException("A new review cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Review result = reviewRepository.save(review);
        reviewSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reviews : Updates an existing review.
     *
     * @param review the review to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated review,
     * or with status 400 (Bad Request) if the review is not valid,
     * or with status 500 (Internal Server Error) if the review couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reviews")
    @Timed
    public ResponseEntity<Review> updateReview(@Valid @RequestBody Review review) throws URISyntaxException {
        log.debug("REST request to update Review : {}", review);
        if (review.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Review result = reviewRepository.save(review);
        reviewSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, review.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reviews : get all the reviews.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of reviews in body
     */
    @GetMapping("/reviews")
    @Timed
    public ResponseEntity<List<Review>> getAllReviews(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Reviews");
        Page<Review> page;
        if (eagerload) {
            page = reviewRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = reviewRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/reviews?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /reviews/:id : get the "id" review.
     *
     * @param id the id of the review to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the review, or with status 404 (Not Found)
     */
    @GetMapping("/reviews/{id}")
    @Timed
    public ResponseEntity<Review> getReview(@PathVariable Long id) {
        log.debug("REST request to get Review : {}", id);
        Optional<Review> review = reviewRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(review);
    }

    /**
     * DELETE  /reviews/:id : delete the "id" review.
     *
     * @param id the id of the review to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reviews/{id}")
    @Timed
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        log.debug("REST request to delete Review : {}", id);

        reviewRepository.deleteById(id);
        reviewSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/reviews?query=:query : search for the review corresponding
     * to the query.
     *
     * @param query the query of the review search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/reviews")
    @Timed
    public ResponseEntity<List<Review>> searchReviews(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Reviews for query {}", query);
        Page<Review> page = reviewSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/reviews");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
