#!/bin/bash

FUNCTION_NAMES=("userHandlers" "workoutHandlers" "exerciseHandlers" "scheduleHandlers" "progressHandlers")

for FUNCTION_NAME in "${FUNCTION_NAMES[@]}"; do
  echo "Packaging and deploying $FUNCTION_NAME"
  cd $FUNCTION_NAME
  powershell Compress-Archive -Path * -DestinationPath ../$handler.zip
  aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://../$FUNCTION_NAME.zip
  cd ..
done
