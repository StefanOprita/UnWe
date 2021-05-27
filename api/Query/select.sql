SELECT * FROM information
Where (?, ?) <= (year, month)
AND (year, month) <= (?, ?)
AND LOWER(judet) IN countyList
ORDER BY year, month;
