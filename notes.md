User
id (PK)
name
email
password

Article
id (PK)
created_at
updated_at

ArticleTranslation
id (PK)
article_id (FK → Article)
language (EN, ID, etc.)
title
content
created_at
updated_at
