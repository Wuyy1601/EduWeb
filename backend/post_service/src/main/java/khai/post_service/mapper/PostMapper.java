package khai.post_service.mapper;

import khai.post_service.dto.response.PostResponse;
import khai.post_service.entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostResponse toPostResponse(Post post);
}