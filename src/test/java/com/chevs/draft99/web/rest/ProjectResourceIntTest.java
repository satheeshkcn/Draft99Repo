package com.chevs.draft99.web.rest;

import com.chevs.draft99.Draft99App1App;

import com.chevs.draft99.domain.Project;
import com.chevs.draft99.repository.ProjectRepository;
import com.chevs.draft99.service.ProjectService;
import com.chevs.draft99.service.dto.ProjectDTO;
import com.chevs.draft99.service.mapper.ProjectMapper;
import com.chevs.draft99.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.chevs.draft99.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.chevs.draft99.domain.enumeration.ProjectType;
import com.chevs.draft99.domain.enumeration.AccessMode;
/**
 * Test class for the ProjectResource REST controller.
 *
 * @see ProjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Draft99App1App.class)
public class ProjectResourceIntTest {

    private static final String DEFAULT_PROJECT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_DESC = "BBBBBBBBBB";

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final ProjectType DEFAULT_PROJECT_TYPE = ProjectType.PORTFOLIO;
    private static final ProjectType UPDATED_PROJECT_TYPE = ProjectType.DESIGN;

    private static final AccessMode DEFAULT_ACCESS_MODE = AccessMode.PUBLIC;
    private static final AccessMode UPDATED_ACCESS_MODE = AccessMode.ASSIGNED;

    private static final String DEFAULT_TAGS = "AAAAAAAAAA";
    private static final String UPDATED_TAGS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final byte[] DEFAULT_COVER_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_COVER_PHOTO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_COVER_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_COVER_PHOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private ProjectMapper projectMapper;
    

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProjectMockMvc;

    private Project project;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectResource projectResource = new ProjectResource(projectService);
        this.restProjectMockMvc = MockMvcBuilders.standaloneSetup(projectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Project createEntity(EntityManager em) {
        Project project = new Project()
            .projectName(DEFAULT_PROJECT_NAME)
            .projectDesc(DEFAULT_PROJECT_DESC)
            .userId(DEFAULT_USER_ID)
            .projectType(DEFAULT_PROJECT_TYPE)
            .accessMode(DEFAULT_ACCESS_MODE)
            .tags(DEFAULT_TAGS)
            .createdDate(DEFAULT_CREATED_DATE)
            .coverPhoto(DEFAULT_COVER_PHOTO)
            .coverPhotoContentType(DEFAULT_COVER_PHOTO_CONTENT_TYPE);
        return project;
    }

    @Before
    public void initTest() {
        project = createEntity(em);
    }

    @Test
    @Transactional
    public void createProject() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(project);
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate + 1);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getProjectName()).isEqualTo(DEFAULT_PROJECT_NAME);
        assertThat(testProject.getProjectDesc()).isEqualTo(DEFAULT_PROJECT_DESC);
        assertThat(testProject.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testProject.getProjectType()).isEqualTo(DEFAULT_PROJECT_TYPE);
        assertThat(testProject.getAccessMode()).isEqualTo(DEFAULT_ACCESS_MODE);
        assertThat(testProject.getTags()).isEqualTo(DEFAULT_TAGS);
        assertThat(testProject.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testProject.getCoverPhoto()).isEqualTo(DEFAULT_COVER_PHOTO);
        assertThat(testProject.getCoverPhotoContentType()).isEqualTo(DEFAULT_COVER_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project with an existing ID
        project.setId(1L);
        ProjectDTO projectDTO = projectMapper.toDto(project);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProjects() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get all the projectList
        restProjectMockMvc.perform(get("/api/projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(project.getId().intValue())))
            .andExpect(jsonPath("$.[*].projectName").value(hasItem(DEFAULT_PROJECT_NAME.toString())))
            .andExpect(jsonPath("$.[*].projectDesc").value(hasItem(DEFAULT_PROJECT_DESC.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].projectType").value(hasItem(DEFAULT_PROJECT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].accessMode").value(hasItem(DEFAULT_ACCESS_MODE.toString())))
            .andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].coverPhotoContentType").value(hasItem(DEFAULT_COVER_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].coverPhoto").value(hasItem(Base64Utils.encodeToString(DEFAULT_COVER_PHOTO))));
    }
    

    @Test
    @Transactional
    public void getProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", project.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(project.getId().intValue()))
            .andExpect(jsonPath("$.projectName").value(DEFAULT_PROJECT_NAME.toString()))
            .andExpect(jsonPath("$.projectDesc").value(DEFAULT_PROJECT_DESC.toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.projectType").value(DEFAULT_PROJECT_TYPE.toString()))
            .andExpect(jsonPath("$.accessMode").value(DEFAULT_ACCESS_MODE.toString()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.coverPhotoContentType").value(DEFAULT_COVER_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.coverPhoto").value(Base64Utils.encodeToString(DEFAULT_COVER_PHOTO)));
    }
    @Test
    @Transactional
    public void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Update the project
        Project updatedProject = projectRepository.findById(project.getId()).get();
        // Disconnect from session so that the updates on updatedProject are not directly saved in db
        em.detach(updatedProject);
        updatedProject
            .projectName(UPDATED_PROJECT_NAME)
            .projectDesc(UPDATED_PROJECT_DESC)
            .userId(UPDATED_USER_ID)
            .projectType(UPDATED_PROJECT_TYPE)
            .accessMode(UPDATED_ACCESS_MODE)
            .tags(UPDATED_TAGS)
            .createdDate(UPDATED_CREATED_DATE)
            .coverPhoto(UPDATED_COVER_PHOTO)
            .coverPhotoContentType(UPDATED_COVER_PHOTO_CONTENT_TYPE);
        ProjectDTO projectDTO = projectMapper.toDto(updatedProject);

        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isOk());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getProjectName()).isEqualTo(UPDATED_PROJECT_NAME);
        assertThat(testProject.getProjectDesc()).isEqualTo(UPDATED_PROJECT_DESC);
        assertThat(testProject.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testProject.getProjectType()).isEqualTo(UPDATED_PROJECT_TYPE);
        assertThat(testProject.getAccessMode()).isEqualTo(UPDATED_ACCESS_MODE);
        assertThat(testProject.getTags()).isEqualTo(UPDATED_TAGS);
        assertThat(testProject.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testProject.getCoverPhoto()).isEqualTo(UPDATED_COVER_PHOTO);
        assertThat(testProject.getCoverPhotoContentType()).isEqualTo(UPDATED_COVER_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProject() throws Exception {
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(project);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        int databaseSizeBeforeDelete = projectRepository.findAll().size();

        // Get the project
        restProjectMockMvc.perform(delete("/api/projects/{id}", project.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = new Project();
        project1.setId(1L);
        Project project2 = new Project();
        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);
        project2.setId(2L);
        assertThat(project1).isNotEqualTo(project2);
        project1.setId(null);
        assertThat(project1).isNotEqualTo(project2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectDTO.class);
        ProjectDTO projectDTO1 = new ProjectDTO();
        projectDTO1.setId(1L);
        ProjectDTO projectDTO2 = new ProjectDTO();
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
        projectDTO2.setId(projectDTO1.getId());
        assertThat(projectDTO1).isEqualTo(projectDTO2);
        projectDTO2.setId(2L);
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
        projectDTO1.setId(null);
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(projectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(projectMapper.fromId(null)).isNull();
    }
}
