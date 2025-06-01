package khai.post_service.mapper;

import javax.annotation.processing.Generated;
import khai.post_service.dto.response.PostResponse;
import khai.post_service.entity.Post;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2025-06-01T10:35:12+0700",
=======
    date = "2025-05-31T15:39:22+0700",
>>>>>>> c9b7c3badd44b1437dffaa20483b391fd6fcf7ab
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public PostResponse toPostResponse(Post post) {
        if ( post == null ) {
            return null;
        }

        PostResponse.PostResponseBuilder postResponse = PostResponse.builder();

        postResponse.content( post.getContent() );
        postResponse.createdDate( post.getCreatedDate() );
        postResponse.id( post.getId() );
        postResponse.modifiedDate( post.getModifiedDate() );
        postResponse.userId( post.getUserId() );

        return postResponse.build();
    }
}
