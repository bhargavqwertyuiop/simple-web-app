# Simple Static Website

A personal website built with HTML, CSS, and JavaScript. 

## v1.0 Features
- Form validation in JS
- Responsive layout via media queries
- Hamburger menu for mobile nav
- Scroll animations using AOS library
- Deployed on GitHub Pages


## v1.1 Features
Added a complete GitHub Actions workflow alongside the Dockerfile:

1. docker-ci.yml: builds and pushes Docker images on dev and deploys/publishes Docker + Pages on main
2. Dockerfile: an Nginx container serving your static assets
3. Secrets: instructions for DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, and using GITHUB_TOKEN

With this workflow, every push to dev builds and tags but only pushes the Docker image; pushes to main also deploy to GitHub Pages and push the Docker image as latest. You can branch off feature branches and open PRs against dev to trigger test builds.
