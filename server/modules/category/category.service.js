import * as categoryRepository
  from "./category.repository.js";

// ======================================================
// HELPERS
// ======================================================

function normalizeString(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizeId(
  id
) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "Category ID is required."
    );
  }

  return normalized;
}

// ======================================================
// CREATE
// ======================================================

function buildCreateData(
  data = {}
) {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    throw new Error(
      "Category data is required."
    );
  }

  const name =
    normalizeString(
      data.name
    );

  const slug =
    normalizeString(
      data.slug
    );

  if (!name) {
    throw new Error(
      "Category name is required."
    );
  }

  if (!slug) {
    throw new Error(
      "Category slug is required."
    );
  }

  return {
    name,

    slug,

    description:
      normalizeString(
        data.description
      ),
  };
}

// ======================================================
// UPDATE
// ======================================================

function buildUpdateData(
  data = {}
) {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    throw new Error(
      "Category update data is required."
    );
  }

  const payload = {};

  if (
    data.name !==
    undefined
  ) {
    const name =
      normalizeString(
        data.name
      );

    if (!name) {
      throw new Error(
        "Category name cannot be empty."
      );
    }

    payload.name =
      name;
  }

  if (
    data.slug !==
    undefined
  ) {
    const slug =
      normalizeString(
        data.slug
      );

    if (!slug) {
      throw new Error(
        "Category slug cannot be empty."
      );
    }

    payload.slug =
      slug;
  }

  if (
    data.description !==
    undefined
  ) {
    payload.description =
      normalizeString(
        data.description
      );
  }

  return payload;
}

// ======================================================
// LIST
// ======================================================

export async function getCategories(
  options = {}
) {
  return categoryRepository.listCategories(
    {
      search:
        normalizeString(
          options.search
        ) ?? "",
    }
  );
}

// ======================================================
// FIND
// ======================================================

export async function getCategoryById(
  id
) {
  return categoryRepository.findCategoryById(
    normalizeId(id)
  );
}

export async function getCategoryBySlug(
  slug
) {
  const normalizedSlug =
    normalizeString(
      slug
    );

  if (!normalizedSlug) {
    throw new Error(
      "Category slug is required."
    );
  }

  return categoryRepository.findCategoryBySlug(
    normalizedSlug
  );
}

export async function getCategoryByName(
  name
) {
  const normalizedName =
    normalizeString(
      name
    );

  if (!normalizedName) {
    throw new Error(
      "Category name is required."
    );
  }

  return categoryRepository.findCategoryByName(
    normalizedName
  );
}

// ======================================================
// CREATE
// ======================================================

export async function createCategory(
  data
) {
  const payload =
    buildCreateData(
      data
    );

  const existing =
    await categoryRepository.findCategoryBySlug(
      payload.slug
    );

  if (existing) {
    throw new Error(
      "Category slug is already in use."
    );
  }

  return categoryRepository.createCategory(
    payload
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateCategory(
  id,
  data
) {
  const normalizedId =
    normalizeId(id);

  const payload =
    buildUpdateData(
      data
    );

  if (
    Object.keys(
      payload
    ).length === 0
  ) {
    throw new Error(
      "No category fields to update."
    );
  }

  if (
    payload.slug
  ) {
    const existing =
      await categoryRepository.findCategoryBySlug(
        payload.slug
      );

    if (
      existing &&
      existing.id !==
        normalizedId
    ) {
      throw new Error(
        "Category slug is already in use."
      );
    }
  }

  return categoryRepository.updateCategory(
    normalizedId,
    payload
  );
}

// ======================================================
// DELETE
// ======================================================

export async function deleteCategory(
  id
) {
  return categoryRepository.deleteCategory(
    normalizeId(id)
  );
}

// ======================================================
// EXPORT
// ======================================================

export default {
  getCategories,

  getCategoryById,
  getCategoryBySlug,
  getCategoryByName,

  createCategory,
  updateCategory,

  deleteCategory,
};