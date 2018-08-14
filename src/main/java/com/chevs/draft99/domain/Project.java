package com.chevs.draft99.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.chevs.draft99.domain.enumeration.ProjectType;

import com.chevs.draft99.domain.enumeration.AccessMode;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_desc")
    private String projectDesc;

    @Column(name = "user_id")
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_type")
    private ProjectType projectType;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_mode")
    private AccessMode accessMode;

    @Column(name = "tags")
    private String tags;

    @Column(name = "created_date")
    private Instant createdDate;

    @Lob
    @Column(name = "cover_photo")
    private byte[] coverPhoto;

    @Column(name = "cover_photo_content_type")
    private String coverPhotoContentType;

    @OneToMany(mappedBy = "project")
    private Set<Document> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public Project projectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDesc() {
        return projectDesc;
    }

    public Project projectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
        return this;
    }

    public void setProjectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
    }

    public Long getUserId() {
        return userId;
    }

    public Project userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ProjectType getProjectType() {
        return projectType;
    }

    public Project projectType(ProjectType projectType) {
        this.projectType = projectType;
        return this;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public AccessMode getAccessMode() {
        return accessMode;
    }

    public Project accessMode(AccessMode accessMode) {
        this.accessMode = accessMode;
        return this;
    }

    public void setAccessMode(AccessMode accessMode) {
        this.accessMode = accessMode;
    }

    public String getTags() {
        return tags;
    }

    public Project tags(String tags) {
        this.tags = tags;
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Project createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public byte[] getCoverPhoto() {
        return coverPhoto;
    }

    public Project coverPhoto(byte[] coverPhoto) {
        this.coverPhoto = coverPhoto;
        return this;
    }

    public void setCoverPhoto(byte[] coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public String getCoverPhotoContentType() {
        return coverPhotoContentType;
    }

    public Project coverPhotoContentType(String coverPhotoContentType) {
        this.coverPhotoContentType = coverPhotoContentType;
        return this;
    }

    public void setCoverPhotoContentType(String coverPhotoContentType) {
        this.coverPhotoContentType = coverPhotoContentType;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Project documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Project addDocuments(Document document) {
        this.documents.add(document);
        document.setProject(this);
        return this;
    }

    public Project removeDocuments(Document document) {
        this.documents.remove(document);
        document.setProject(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
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
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", projectName='" + getProjectName() + "'" +
            ", projectDesc='" + getProjectDesc() + "'" +
            ", userId=" + getUserId() +
            ", projectType='" + getProjectType() + "'" +
            ", accessMode='" + getAccessMode() + "'" +
            ", tags='" + getTags() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", coverPhoto='" + getCoverPhoto() + "'" +
            ", coverPhotoContentType='" + getCoverPhotoContentType() + "'" +
            "}";
    }
}
