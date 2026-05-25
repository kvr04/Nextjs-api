const base = 'http://localhost:3000';

async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(base + '/api/here4');
      if (r.ok) return true;
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Server did not become ready');
}

(async () => {
  try {
    console.log('Waiting for server...');
    await waitForServer();
    console.log('Server ready — running CRUD tests');

    // POST -> create student via here3
    const roll = Math.floor(Math.random()*9000)+100;
    const postBody = { student_name: 'Test Student', grade: 10, roll_num: roll, class_teacher: 'Ms Test', sport: 'Soccer' };
    const postRes = await fetch(base + '/api/here3', {
      method: 'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify(postBody)
    });
    const postJson = await postRes.json();
    console.log('POST status', postRes.status, 'body', postJson);
    const student = postJson?.data;
    if (!student) throw new Error('POST did not return created student');
    const id = student.student_id || student.id || student.studentId;

    // GET -> list students
    const getRes = await fetch(base + '/api/here4');
    const getJson = await getRes.json();
    console.log('GET status', getRes.status, 'body sample count', Array.isArray(getJson.data) ? getJson.data.length : 'N/A');

    // PUT -> update the student
    const putBody = { student_id: id, student_name: 'Updated Student', grade: 11, roll_num: roll, class_teacher: 'Mr Update' };
    const putRes = await fetch(base + '/api/here5', { method: 'PUT', headers: { 'content-type':'application/json' }, body: JSON.stringify(putBody) });
    const putJson = await putRes.json();
    console.log('PUT status', putRes.status, 'body', putJson);

    // DELETE -> delete the student
    const delRes = await fetch(base + '/api/here6?student_id=' + encodeURIComponent(id), { method: 'DELETE' });
    const delJson = await delRes.json();
    console.log('DELETE status', delRes.status, 'body', delJson);

    console.log('CRUD tests completed');
  } catch (e) {
    console.error('CRUD test failed:', e);
    process.exitCode = 1;
  }
})();