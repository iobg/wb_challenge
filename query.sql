select start_weight,end_weight,zone, rate, shipping_speed, locale from rates
where client_id=1240
group by start_weight, end_weight, zone, shipping_speed, locale;