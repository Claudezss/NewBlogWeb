import request from '@/utils/request';

export async function BlogList() {
  return request(`https://api.claudezhang.ca/blog/post/?format=json`, {
    method: 'GET',
  });
}

export async function CbcList() {
  return request(`https://api.claudezhang.ca/cbc`, {
    method: 'GET',
  });
}
