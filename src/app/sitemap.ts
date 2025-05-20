import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ricaleenmetal.co.id",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          id: "https://ricaleenmetal.co.id/id",
          de: "https://ricaleenmetal.co.id/en",
        },
      },
    },
    {
      url: "https://ricaleenmetal.co.id/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          id: "https://ricaleenmetal.co.id/id/about",
          en: "https://ricaleenmetal.co.id/en/about",
        },
      },
    },
    {
      url: "https://ricaleenmetal.co.id/products",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          id: "https://ricaleenmetal.co.id/id/products",
          en: "https://ricaleenmetal.co.id/en/products",
        },
      },
    },
    {
      url: "https://ricaleenmetal.co.id/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          id: "https://ricaleenmetal.co.id/id/contact",
          en: "https://ricaleenmetal.co.id/en/contact",
        },
      },
    },
    {
      url: "https://ricaleenmetal.co.id/articles",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: {
          id: "https://ricaleenmetal.co.id/id/articles",
          en: "https://ricaleenmetal.co.id/en/articles",
        },
      },
    },
  ];
}
