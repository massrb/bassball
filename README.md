# README


This is a Ruby on Rails/React web application that was part of an exercise. 
It shows a sortable table of baseball player statistics. 
The table shows the following statistics for each hitter: AVG, HR, RBI, RUNS, SB, 
and OPS.

The default sort is by AVG, descending. Clicking on a column header sorts the
data by the selected column, without reloading the page. The page is paginated and implemented with react

Clicking on the same column that is currently being used to sort the players flips the
direction of the sort. 

This xml file 1998statistics.xml contained in the root directory was uploaded to create the content on the app that is running on heroku and has the statistics for all baseball players in the Major Leagues during the 1998

The app is running here

https://baseball-stats-proj.herokuapp.com/
