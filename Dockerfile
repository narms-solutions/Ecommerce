FROM mcr.microsoft.com/playwright:v1.53.1-jammy

WORKDIR /app

# copy all files to container (To not include any specific file add the fil name to dockerignorefile
COPY  . .


ADD  . /usr/app/


# Install dependencies
RUN npm ci

#commands to run test
CMD [ "npx", "playwright", "test" ]

#reports

VOLUME /app/playwright-report




