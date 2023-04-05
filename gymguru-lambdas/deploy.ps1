$handlers = @("userHandlers", "workoutHandlers", "exerciseHandlers", "scheduleHandlers", "progressHandlers")

foreach ($handler in $handlers) {
    Write-Host "Packaging and deploying $handler"

    Push-Location -Path $handler
    Compress-Archive -Path * -DestinationPath ../$handler.zip -Force
    Pop-Location

    aws lambda update-function-code `
        --function-name $handler `
        --zip-file fileb://$handler.zip
}
