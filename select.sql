SELECT id,judet,total_someri,total_femei,total_barbati,indemnizati,neindemnizati,rata_somaj,rata_somaj_femei,rata_somaj_barbati,total_urban,femei_urban,barbati_urban,total_rural,femei_rural,barbati_rural,fara_studii,invatamant_primar,invatamant_gimnazial,invatamant_liceal,invatamant_post,invatamant_profesional,invatamant_universitar,sub_25,25_29,30_39,40_49,50_55,peste_55,month,year
FROM information
WHERE
    month = num
AND
    year = num2;