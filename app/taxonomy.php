<?php get_header(); ?>

    <div class="container">
        <div class="col-md-12"><ul class="history-page">
                <li><a href="/">Главная</a></li>
                <li>Каталог продукции</li>
            </ul></div>
    </div>

    <section class="content-page">
        <div class="container mobile-reverse">
            <div class="col-xs-12 col-sm-3 col-md-3">
                <?php get_sidebar(); ?>
            </div>


            <div class="col-xs-12 col-sm-9 col-md-9">

                <div class="row">
                    <h2 class="container-title">Каталог продукции</h2>
                    <div class="container-title_sm">«ТВИСТ» предлагает широкий ассортимент офисных дверей, перегородок, стекла и фурнитуры <br> для магазинов, торговых центров, офисов и других организаций.</div>
                    <div class="col-xs-12">
                        <div class="catalog-navbar">
                            <div class="catalog-navbar__top">
                                <?php
                                $terms = get_terms( array(
                                    'taxonomy' => 'products_category',
                                    'hide_empty' => false,
                                ) );
                                $i = 1;
                                foreach ($terms as $term) {
                                    if($term->term_id == get_queried_object()->term_id) {
                                        $class = 'active';
                                    } else {
                                        $class = '';
                                    }
                                    echo '
                                            <div class="catalog-navbar__item '.$class.' catalog-navbar-item-'.$i.'">
                                                <a href="'.get_term_link($term->term_id, 'products_category').'">
                                                    <span>'. $term->name .'</span>
                                                </a>
                                            </div>
                                        ';
                                    $i++;
                                }
                                ?>
                            </div>

                            <!--<div class="catalog-navbar__bottom">
                                <div class="catalog-navbar__bottom-title">Стеклянные перегородки</div>
                                <ul>
                                    <li><a href="catalog.html">Раздвижные перегородки</a></li>
                                    <li><a href="catalog.html">Телескопические перегородки</a></li>
                                    <li><a href="catalog.html">Складные «книжка» перегородки</a></li>
                                    <li><a href="catalog.html">Трансформируемые перегородки</a></li>
                                    <li class="active"><a href="catalog.html">Мобильные перегородки</a></li>
                                    <li><a href="catalog.html">Душевые перегородки</a></li>

                                </ul>
                            </div>-->

                        </div>
                    </div>

                    <?php
                    $i = 1;
                    $args = array(
                        'order' => 'DESC',
                        'posts_per_page' => 13,
                        'post_type' => 'products',
                        'tax_query' => array(
                            array(
                                'taxonomy' => 'products_category',
                                'field'    => 'term_id',
                                'terms'    => get_queried_object()->term_id
                            )
                        )
                    );
                    $the_query = new WP_Query($args);
                    ?>
                    <?php if ( $the_query->have_posts() ) : ?>
                        <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <div class="catalog__item">
                                    <div class="thumb">
                                        <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
                                    </div>
                                    <div class="catalog__item-body">
                                        <div class="catalog__item-body_title"><?= wp_trim_words(get_the_title(), 3); ?></div>
                                        <div class="catalog__item-body_text">
                                            <?= get_post_meta($post->ID, 'product_excerpt', true); ?>
                                        </div>
                                        <a class="left__aside-item_more" href="<?php the_permalink(); ?>">Подробнее</a>
                                    </div>
                                </div>
                            </div>
                            <?php if($i == 7): ?>
                                <div class="col-xs-12 col-sm-6 col-md-8">
                                    <div class="catalog__item-banner">
                                        <img src="<?= get_template_directory_uri(); ?>/img/banner-2.png" alt="">
                                        <button class="btn red-button banner-button popup-order_open">Заказать</button>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            <?php endif; ?>
                            <?php $i++; ?>
                        <?php endwhile; ?>
                        <?php wp_reset_postdata(); ?>
                    <?php else : ?>
                        <p><?php _e( 'Извините, ничего не найдено.' ); ?></p>
                    <?php endif; ?>

                    <!--<div class="col-md-12"><a href="catalog.html" class="btn full-button">Смотреть больше</a></div>-->
                    <div class="clearfix"></div>


                </div>

            </div>
        </div>
    </section>

<?php get_footer(); ?>