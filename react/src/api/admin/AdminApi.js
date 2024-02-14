import {fetchAuthSession} from '@aws-amplify/auth';

const url = import.meta.env.VITE_NODE_ENV === 'local' ?
            import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_API_URL;

/**
 * Get the token for authentication.
 * @return {Promise<string>} The token.
 */
const getToken = async () => {
  if (import.meta.env.VITE_NODE_ENV === 'local') {
    return 'local';
  } else {
    return (await fetchAuthSession()).tokens.accessToken.toString();
  }
};

/**
 * Get a specific page.
 * @param {string} id - The ID of the page.
 * @return {Promise<Object>} The response.
 */
export async function getPage(id) {
  const response = await fetch(`${url}/admin/page/get/${id}`, {
    headers: {
      Authorization: await getToken(),
    },
  });

  return response.json();
}

/**
 * List all pages.
 * @return {Promise<Array>} The response.
 */
export async function listPages() {
  const response = await fetch(`${url}/admin/page/list`, {
    headers: {
      Authorization: await getToken(),
    },
  });
  return response.json();
}

/**
 * Update a specific link.
 * @param {string} id - The ID of the page.
 * @param {Object} link - The new link data.
 * @return {Promise<Object>} The response.
 */
export async function updateLink(id, link) {
  const response = await fetch(`${url}/admin/page/${id}/link/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(link),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Update a specific social link.
 * @param {string} id - The ID of the page.
 * @param {Object} link - The new social link data.
 * @return {Promise<Object>} The response.
 */
export async function updateSocialLink(id, link) {
  const response = await fetch(`${url}/admin/page/${id}/social/link/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(link),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Reorder the links on a page.
 * @param {string} id - The ID of the page.
 * @param {Array<string>} orderedLinkIds - The new order of link IDs.
 * @return {Promise<Object>} The response.
 */
export async function reorderLinks(id, orderedLinkIds) {
  const response = await fetch(`${url}/admin/page/${id}/link/organize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(orderedLinkIds),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Reorder the social links on a page.
 * @param {string} id - The ID of the page.
 * @param {Array<string>} orderedLinkIds - The new order of social link IDs.
 * @return {Promise<Object>} The response.
 */
export async function reorderSocialLinks(id, orderedLinkIds) {
  const response = await fetch(`${url}/admin/page/${id}/social/link/organize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(orderedLinkIds),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Delete a specific link.
 * @param {string} id - The ID of the page.
 * @param {string} linkId - The ID of the link to delete.
 * @return {Promise<Object>} The response.
 */
export async function deleteLink(id, linkId) {
  const response = await fetch(`${url}/admin/page/${id}/link/remove/${linkId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await getToken(),
        },
      });

  return response.json();
}

/**
 * Delete a specific page.
 * @param {string} id - The ID of the page to delete.
 * @return {Promise<Object>} The response.
 */
export async function deletePage(id) {
  const response = await fetch(`${url}/admin/page/${id}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
  });

  return response.json();
}

/**
 * Delete a specific social link.
 * @param {string} id - The ID of the page.
 * @param {string} linkId - The ID of the social link to delete.
 * @return {Promise<Object>} The response.
 */
export async function deleteSocialLink(id, linkId) {
  const response =
        await fetch(`${url}/admin/page/${id}/social/link/remove/${linkId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': await getToken(),
              },
            });

  return response.json();
}

/**
 * Add a new link to a page.
 * @param {string} id - The ID of the page.
 * @param {Object} link - The new link data.
 * @return {Promise<Object>} The response.
 */
export async function addLink(id, link) {
  const response = await fetch(`${url}/admin/page/${id}/link/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(link),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Add a new social link to a page.
 * @param {string} id - The ID of the page.
 * @param {Object} link - The new social link data.
 * @return {Promise<Object>} The response.
 */
export async function addSocialLink(id, link) {
  const response = await fetch(`${url}/admin/page/${id}/social/link/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(link),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Update the bio info of a page.
 * @param {string} id - The ID of the page.
 * @param {Object} page - The new bio info.
 * @return {Promise<Object>} The response.
 */
export async function updateBioInfo(id, page) {
  const response = await fetch(`${url}/admin/page/${id}/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify(page),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Upload a new profile image for a page.
 * @param {string} id - The ID of the page.
 * @param {File} file - The new profile image.
 * @return {Promise<Object>} The response.
 */
export async function uploadProfileImage(id, file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${url}/admin/upload/profile/image/id/${id}`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: await getToken(),
    },
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Create a new page.
 * @param {string} id - The ID of the new page.
 * @param {string} name - The name of the new page.
 * @param {string} descriptionTitle - The description title of the new page.
 * @param {string} imageUrl - The image URL of the new page.
 * @return {Promise<Object>} The response.
 */
export async function createPagte(id, name, descriptionTitle, imageUrl) {
  const response = await fetch(`${url}/admin/page/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
    body: JSON.stringify({
      id,
      bioInfo: {
        name,
        descriptionTitle,
        imageUrl,
      },
    }),
  });

  if (!response.ok) {
    console.error('Failed to make POST request:', response);
    throw new Error('Failed to make POST request');
  } else {
    const data = await response.json();
    return data;
  }
}

/**
 * Check if a page alias is available.
 * @param {string} id - The ID of the page.
 * @return {Promise<Object>} The response.
 */
export async function checkIfAliasIsAvailable(id) {
  const response = await fetch(`${url}/admin/page/${id}/availability`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
  });

  return response.json();
}

/**
 * Update the ID of a page.
 * @param {string} id - The current ID of the page.
 * @param {string} newId - The new ID of the page.
 * @return {Promise<Object>} The response.
 */
export async function updatePageid(id, newId) {
  const response = await fetch(`${url}/admin/page/${id}/update/pageId/${newId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await getToken(),
        },
      });

  return response.json();
}

/**
 * Update the colors of a page.
 * @param {string} id - The ID of the page.
 * @param {Object} colors - The new colors.
 * @return {Promise<Object>} The response.
 */
export async function updatePageColors(id, colors) {
  const response = await fetch(`${url}/admin/page/${id}/update/colors`, {
    method: 'POST',
    body: JSON.stringify(colors),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken(),
    },
  });

  return response.json();
}
