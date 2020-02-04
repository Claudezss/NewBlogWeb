import request from '@/utils/request';

export async function BlogList() {
  return request(`https://api.claudezhang.ca/blog/post/?format=json`, {
    method: 'GET',
  });
}

export async function Blog(params) {
  return request(`https://api.claudezhang.ca/blog/post/?format=json&id=${params.id}`, {
    method: 'GET',
  });
}

export async function CbcRssList() {
  return request(`https://api.claudezhang.ca/cbc`, {
    method: 'GET',
  });
}

export async function CategoryList(params) {
  return request(`https://api.claudezhang.ca/blog/category/?format=json`, {
    method: 'GET',
    headers: params.headers,
  });
}

export async function TagList(params) {
  return request(`https://api.claudezhang.ca/blog/tag/?format=json`, {
    method: 'GET',
    headers: params.headers,
  });
}

export async function AddView(params) {
  return request('https://api.claudezhang.ca/blog-view-add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function AddComment(params) {
  return request('https://api.claudezhang.ca/blog-comment-add/', {
    method: 'POST',
    headers: params.headers,
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function SendEmail(params) {
  return request('https://api.claudezhang.ca/sendmail/', {
    method: 'POST',
    headers: params.headers,
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function PostComments(params) {
  return request(`https://api.claudezhang.ca/blog/comments/?post_id=${params.post_id}`, {
    method: 'GET',
    headers: params.headers,
  });
}

export async function Login(params) {
  console.log(params)
  return request('https://api.claudezhang.ca/login', {
    method: 'POST',
    headers: params.headers,
    data: {
     ...params
    },
  });
}

export async function DownloadBook(params) {
  return request('https://api.claudezhang.ca/downloadbook/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function FileList(params) {
  //console.log(params.post_id);
  return request(`https://api.claudezhang.ca/filelist/`, {
    method: 'GET',
    headers: params.headers,
  });
}
export async function NewFolder(params) {
  //console.log(params.post_id);
  return request(`https://api.claudezhang.ca/newfolder/`, {
    method: 'POST',
    headers: params.headers,
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function OpenFolder(params) {
  return request('https://api.claudezhang.ca/openfolder/', {
    method: 'POST',
    headers: params.headers,
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function CurrencyRatio() {
  return request('https://api.claudezhang.ca/currency/', {
    method: 'GET',
  });
}

export async function JX3School() {
  return request('https://api.claudezhang.ca/jx3/school/?format=json', {
    method: 'GET',
  });
}
export async function JX3Class() {
  return request('https://api.claudezhang.ca/jx3/class/?format=json', {
    method: 'GET',
  });
}
export async function JX3Marco() {
  return request('https://api.claudezhang.ca/jx3/marco/?format=json', {
    method: 'GET',
  });
}
