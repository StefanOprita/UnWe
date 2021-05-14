SELECT * FROM information
Where (anStart, lunaStart) <= (year, month)
AND (year, month) <= (anFinal, lunaFinal)
AND judet IN ( 'lista vine aici','si aici')
ORDER BY year, month
