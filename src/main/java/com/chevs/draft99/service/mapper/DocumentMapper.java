package com.chevs.draft99.service.mapper;

import com.chevs.draft99.domain.*;
import com.chevs.draft99.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {

    @Mapping(source = "project.id", target = "projectId")
    DocumentDTO toDto(Document document);

    @Mapping(source = "projectId", target = "project")
    Document toEntity(DocumentDTO documentDTO);

    default Document fromId(Long id) {
        if (id == null) {
            return null;
        }
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
