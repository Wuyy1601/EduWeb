package khai.post_service.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;


import khai.post_service.entity.Post;


public interface PostRepository extends MongoRepository<Post, String> {
    Page<Post> findAllByUserId(String userId, Pageable pageable);
}