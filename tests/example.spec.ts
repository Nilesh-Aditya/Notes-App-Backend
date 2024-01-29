import { test, expect } from '@playwright/test';

test('Notes without Authorisation', async ({ request }) => {
  let res = await request.get('/api/notes')
  let data:any = res.json();
  console.log(await res.status(), await res.statusText());
  
  // Expect a title "to contain" a substring.
  await expect(res).not.toBeOK();
  await expect(await res.status()).toBe(401);
  if(data && data.msg){
    await expect(data.msg).toContainText('No token, authorization denied')
  }
});