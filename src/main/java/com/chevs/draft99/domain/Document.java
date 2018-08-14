package com.chevs.draft99.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.chevs.draft99.domain.enumeration.DocType;

import com.chevs.draft99.domain.enumeration.DocFormat;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_desc")
    private String docDesc;

    @Lob
    @Column(name = "document")
    private byte[] document;

    @Column(name = "document_content_type")
    private String documentContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "doctype")
    private DocType doctype;

    @Enumerated(EnumType.STRING)
    @Column(name = "doc_format")
    private DocFormat docFormat;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocName() {
        return docName;
    }

    public Document docName(String docName) {
        this.docName = docName;
        return this;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocDesc() {
        return docDesc;
    }

    public Document docDesc(String docDesc) {
        this.docDesc = docDesc;
        return this;
    }

    public void setDocDesc(String docDesc) {
        this.docDesc = docDesc;
    }

    public byte[] getDocument() {
        return document;
    }

    public Document document(byte[] document) {
        this.document = document;
        return this;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public String getDocumentContentType() {
        return documentContentType;
    }

    public Document documentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
        return this;
    }

    public void setDocumentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
    }

    public DocType getDoctype() {
        return doctype;
    }

    public Document doctype(DocType doctype) {
        this.doctype = doctype;
        return this;
    }

    public void setDoctype(DocType doctype) {
        this.doctype = doctype;
    }

    public DocFormat getDocFormat() {
        return docFormat;
    }

    public Document docFormat(DocFormat docFormat) {
        this.docFormat = docFormat;
        return this;
    }

    public void setDocFormat(DocFormat docFormat) {
        this.docFormat = docFormat;
    }

    public Project getProject() {
        return project;
    }

    public Document project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", docName='" + getDocName() + "'" +
            ", docDesc='" + getDocDesc() + "'" +
            ", document='" + getDocument() + "'" +
            ", documentContentType='" + getDocumentContentType() + "'" +
            ", doctype='" + getDoctype() + "'" +
            ", docFormat='" + getDocFormat() + "'" +
            "}";
    }
}
