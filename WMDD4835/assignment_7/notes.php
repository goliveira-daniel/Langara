<?php 

get_the_author_meta( 'user_email' );

echo get_avatar( get_the_author_meta( 'user_email' ) );

?>