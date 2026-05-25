$base = 'http://localhost:3000/api'
Write-Output '--- POST /api/here3 ---'
try {
  $payload = @{ student_name='Test Student'; grade=10; roll_num=999; class_teacher='Ms. A'; sport='Soccer' } | ConvertTo-Json
  $post = Invoke-RestMethod -Uri "$base/here3" -Method Post -Body $payload -ContentType 'application/json'
  Write-Output ($post | ConvertTo-Json -Depth 5)
  $id = $post.data.student_id
  Write-Output "Created student_id=$id"

  Write-Output '--- GET /api/here4 ---'
  $get = Invoke-RestMethod -Uri "$base/here4" -Method Get
  Write-Output ($get | ConvertTo-Json -Depth 5)

  Write-Output '--- PUT /api/here5 ---'
  $payload = @{ student_id=$id; student_name='Test Student Updated'; grade=11; roll_num=999; class_teacher='Ms. B' } | ConvertTo-Json
  $put = Invoke-RestMethod -Uri "$base/here5" -Method Put -Body $payload -ContentType 'application/json'
  Write-Output ($put | ConvertTo-Json -Depth 5)

  Write-Output '--- GET After PUT /api/here4 ---'
  $getAfterPut = Invoke-RestMethod -Uri "$base/here4" -Method Get
  Write-Output ($getAfterPut | ConvertTo-Json -Depth 5)

  Write-Output '--- DELETE /api/here6 ---'
  $delete = Invoke-RestMethod -Uri "$base/here6?student_id=$id" -Method Delete
  Write-Output ($delete | ConvertTo-Json -Depth 5)

  Write-Output '--- GET After DELETE /api/here4 ---'
  $getAfterDelete = Invoke-RestMethod -Uri "$base/here4" -Method Get
  Write-Output ($getAfterDelete | ConvertTo-Json -Depth 5)
} catch {
  Write-Output 'ERROR:'
  if ($_.Exception.Response) { Write-Output $_.Exception.Response.StatusCode.Value__ }
  Write-Output $_.Exception.Message
}
