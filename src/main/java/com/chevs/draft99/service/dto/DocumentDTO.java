package com.chevs.draft99.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.chevs.draft99.domain.enumeration.DocType;
import com.chevs.draft99.domain.enumeration.DocFormat;

/**
 * A DTO for the Document entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    private String docName;

    private String docDesc;

    @Lob
    private byte[] document;
    private String documentContentType;

    private DocType doctype;

    private DocFormat docFormat;

    private Long projectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocDesc() {
        return docDesc;
    }

    public void setDocDesc(String docDesc) {
        this.docDesc = docDesc;
    }

    public byte[] getDocument() {
        return document;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public String getDocumentContentType() {
        return documentContentType;
    }

    public void setDocumentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
    }

    public DocType getDoctype() {
        return doctype;
    }

    public void setDoctype(DocType doctype) {
        this.doctype = doctype;
    }

    public DocFormat getDocFormat() {
        return docFormat;
    }

    public void setDocFormat(DocFormat docFormat) {
        this.docFormat = docFormat;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentDTO documentDTO = (DocumentDTO) o;
        if (documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
            "id=" + getId() +
            ", docName='" + getDocName() + "'" +
            ", docDesc='" + getDocDesc() + "'" +
            ", document='" + getDocument() + "'" +
            ", doctype='" + getDoctype() + "'" +
            ", docFormat='" + getDocFormat() + "'" +
            ", project=" + getProjectId() +
            "}";
    }
}
