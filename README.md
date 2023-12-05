Loaf - Project and Teammate Recommendation Platform
====

Loaf is a platform designed to facilitate project and teammate recommendations through user data analysis. As university students engage in approximately two external activities per year, finding suitable teammates for projects or studies can be challenging. Many students struggle to assemble a team or are unsure about the required qualifications.

To address this issue, we introduce "Loaf: User Data Analysis for Project and Teammate Recommendations." Loaf serves as a platform where users can connect with optimal projects and teammates. Through our platform, users can discover and join projects that match their interests, ultimately fostering personal and professional growth.

## Project Overview

### Features

1. **User Profile and Project Registration**: Users can create profiles and register their projects on the platform.
2. **Custom Filtering**: Utilize custom filters to search for users and projects based on specific criteria.
3. **Association Analysis**: Leverage association analysis to receive personalized recommendations for users and projects.
4. **Competition Information**: Access information about competitions, providing users with relevant project details.

### How it Works

1. Users create profiles and register their projects.
2. Custom filters enable users to search for projects and teammates.
3. Association analysis recommends suitable users and projects based on user data.
4. Additional features include providing information about competitions to help users find projects that align with their needs.

Unlike many competitors relying on anonymous comments for team formation, Loaf stands out by analyzing user data to recommend not only fitting team members but also projects that would benefit the user.

### Award
**2nd Prize in the 6th University Student Digital Solution Challenge (K-Hackathon), Ministry of Science and ICT [Nov 2018]**
- National-wide Development Competition

## Interviews for Winners of the 6th University Student Digital Solution Challenger (K-Hackathon)
- [AsiaToday Link](http://www.asiatoday.co.kr/view.php?key=20181116010009943)
- [NewsA Link](http://www.newsa.co.kr/news/articleView.html?idxno=194846#09Xb)
- [MoneyToday Link](http://ubiz.mt.co.kr/articleView.html?no=2018111617507475355&aType=u0101)





Developing loaf
====

sharing project thank u

![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).

## Basic Commands

### Setting Up Your Users

- To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

- To create an **superuser account**, use this command:
  ```bash
  $ python manage.py createsuperuser
