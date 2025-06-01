package khai.post_service.mapper;

import javax.annotation.processing.Generated;
import khai.post_service.dto.response.PostResponse;
import khai.post_service.entity.Post;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T10:35:12+0700",
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
