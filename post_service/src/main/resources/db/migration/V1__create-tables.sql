CREATE TABLE IF NOT EXISTS Categories (
  categoryId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) NOT NULL,
  isEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (categoryId)
);

CREATE INDEX idx_categories_name ON Categories (name);
CREATE INDEX idx_categories_isEnabled ON Categories (isEnabled);

CREATE TABLE IF NOT EXISTS Posts (
  postId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  authorEmail VARCHAR(255) NOT NULL,
  authorName VARCHAR(255) NOT NULL,
  categoryId VARCHAR(36) NOT NULL,
  isPublic BOOLEAN NOT NULL DEFAULT FALSE,
  isEdited BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (postId),
  FOREIGN KEY (categoryId) REFERENCES Categories(categoryId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_posts_categoryId ON Posts (categoryId);
CREATE INDEX idx_posts_authorEmail ON Posts (authorEmail);
CREATE INDEX idx_posts_isPublic ON Posts (isPublic);
CREATE INDEX idx_posts_createdAt ON Posts (createdAt);


INSERT INTO Categories (categoryId, name, color)
SELECT '9d686b24-147c-49c0-8e64-c09a8e5b30cc', 'Frontend', '#BB4430'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = '9d686b24-147c-49c0-8e64-c09a8e5b30cc');

INSERT INTO Categories (categoryId, name, color)
SELECT 'fa10864e-9d64-46d8-8337-979131cd33c6', 'Backend', '#55A630'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = 'fa10864e-9d64-46d8-8337-979131cd33c6');

INSERT INTO Categories (categoryId, name, color)
SELECT '82cd47fd-a087-4378-9259-b72156be2a48', 'Mobile', '#CDC706'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = '82cd47fd-a087-4378-9259-b72156be2a48');

INSERT INTO Categories (categoryId, name, color)
SELECT 'd6a96e1b-1749-461b-b978-8999b8689496', 'DevOps', '#094D92'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = 'd6a96e1b-1749-461b-b978-8999b8689496');

INSERT INTO Categories (categoryId, name, color)
SELECT '74abdcab-329c-4dd6-9168-2c28e325ecc2', 'Banco de Dados', '#E07A5F'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = '74abdcab-329c-4dd6-9168-2c28e325ecc2');

INSERT INTO Categories (categoryId, name, color)
SELECT '76325af1-e83d-40c6-ba2e-538558c7abe9', 'Cloud', '#13C4A3'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = '76325af1-e83d-40c6-ba2e-538558c7abe9');

INSERT INTO Categories (categoryId, name, color)
SELECT '3b0d2288-85ac-4bbf-adb5-29d7246d0621', 'Segurança', '#8489CF'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = '3b0d2288-85ac-4bbf-adb5-29d7246d0621');

INSERT INTO Categories (categoryId, name, color)
SELECT 'b88dbe63-e673-4d3d-9903-a5d87adc9730', 'IA', '#934683'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = 'b88dbe63-e673-4d3d-9903-a5d87adc9730');

INSERT INTO Categories (categoryId, name, color)
SELECT 'c94091bb-9587-4173-845a-4e2a59f15e5e', 'Outros', '#D98F40'
WHERE NOT EXISTS (SELECT 1 FROM Categories WHERE categoryId = 'c94091bb-9587-4173-845a-4e2a59f15e5e');


