CREATE TABLE IF NOT EXISTS categories (
  category_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
);

CREATE INDEX idx_categories_name ON categories (name);
CREATE INDEX idx_categories_is_enabled ON categories (is_enabled);

CREATE TABLE IF NOT EXISTS posts (
  post_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  category_id VARCHAR(36) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_posts_category_id ON posts (category_id);
CREATE INDEX idx_posts_author_email ON posts (author_email);
CREATE INDEX idx_posts_is_public ON posts (is_public);
CREATE INDEX idx_posts_created_at ON posts (created_at);


INSERT INTO categories (category_id, name, color)
SELECT '9d686b24-147c-49c0-8e64-c09a8e5b30cc', 'Frontend', '#BB4430'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = '9d686b24-147c-49c0-8e64-c09a8e5b30cc');

INSERT INTO categories (category_id, name, color)
SELECT 'fa10864e-9d64-46d8-8337-979131cd33c6', 'Backend', '#55A630'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = 'fa10864e-9d64-46d8-8337-979131cd33c6');

INSERT INTO categories (category_id, name, color)
SELECT '82cd47fd-a087-4378-9259-b72156be2a48', 'Mobile', '#CDC706'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = '82cd47fd-a087-4378-9259-b72156be2a48');

INSERT INTO categories (category_id, name, color)
SELECT 'd6a96e1b-1749-461b-b978-8999b8689496', 'DevOps', '#094D92'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = 'd6a96e1b-1749-461b-b978-8999b8689496');

INSERT INTO categories (category_id, name, color)
SELECT '74abdcab-329c-4dd6-9168-2c28e325ecc2', 'Banco de Dados', '#E07A5F'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = '74abdcab-329c-4dd6-9168-2c28e325ecc2');

INSERT INTO categories (category_id, name, color)
SELECT '76325af1-e83d-40c6-ba2e-538558c7abe9', 'Cloud', '#13C4A3'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = '76325af1-e83d-40c6-ba2e-538558c7abe9');

INSERT INTO categories (category_id, name, color)
SELECT '3b0d2288-85ac-4bbf-adb5-29d7246d0621', 'Segurança', '#8489CF'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = '3b0d2288-85ac-4bbf-adb5-29d7246d0621');

INSERT INTO categories (category_id, name, color)
SELECT 'b88dbe63-e673-4d3d-9903-a5d87adc9730', 'IA', '#934683'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = 'b88dbe63-e673-4d3d-9903-a5d87adc9730');

INSERT INTO categories (category_id, name, color)
SELECT 'c94091bb-9587-4173-845a-4e2a59f15e5e', 'Outros', '#D98F40'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE category_id = 'c94091bb-9587-4173-845a-4e2a59f15e5e');


