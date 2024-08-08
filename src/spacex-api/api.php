<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    // Dummy check for example purposes
    if ($input['username'] === 'user' && $input['password'] === 'pass') {
        echo json_encode(['token' => 'your-jwt-token']);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Unauthorized']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Add authentication check here (e.g., check JWT token)

    // Fetch SpaceX data
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.spacexdata.com/v4/rockets");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}
?>
