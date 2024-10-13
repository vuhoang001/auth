const AM = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accepted or Declined</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        button {
            padding: 10px 20px;
            margin: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        .accepted {
            background-color: green;
            color: white;
        }
        .declined {
            background-color: red;
            color: white;
        }
    </style>
</head>
<body>

    <h1>Vui lòng chọn một trong các tùy chọn</h1>
    <button class="accepted" onclick="handleResponse('Accepted')">Accepted</button>
    <button class="declined" onclick="handleResponse('Declined')">Declined</button>

    <script>
        function handleResponse(response) {
            alert("Bạn đã chọn: " + response);
        }
    </script>

</body>
</html>
`;

module.exports = {
  AM,
};
