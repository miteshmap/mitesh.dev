---
title: "Drupal 8: Optional dependency injection in Plugin"
path: "/drupal-8-optional-dependency-injection-plugin"
date: "2018-11-04"
author: "Mitesh Patel"
excerpt: "With Drupal 8 adoption to symfony services, we have benefited with dependency injection, initiating required objects of injected services. In Drupal 8, We also have other areas like plugins, controllers where we extensively use dependency injection with the help of container."
tags:
  [
    "Drupal 8",
    "Drupal",
    "Dependency injection",
    "Drupal plugin",
    "Drupal services",
  ]
references:
  [
    "https://symfony.com/doc/current/service_container/optional_dependencies.html#ignoring-missing-dependencies",
  ]
code: ["https://github.com/miteshmap/plugin_optional_dependency"]
---

With Drupal 8 adoption to symfony services, we have benefited with dependency injection, initiating required objects of injected services. In Drupal 8, We also have other areas like plugins, controllers where we extensively use dependency injection with the help of container.

Sometimes (when we are working on [multisite](https://www.drupal.org/docs/8/multisite) the services may not be available for plugin OR controller to use as dependency injection. Ideal example for this could be two different modules. one of them expose a service which is used in one site, extensively and never used in other sites, But you need to use that service when available for a part of a service in other sites.

I was looking for better approach to resolve this issue and I came up with a solution for this and that is to create a new service and make the unavailable service as optional into the new service.

The concept is called [Optional Argument](https://symfony.com/doc/current/service_container/optional_dependencies.html) In symfony.

> Sometimes, one of your services may have an optional dependency, meaning that the dependency is not required for your service to work properly. You can configure the container to not throw an error in this case.

I hope you find this approach helpful. Let's start with an [example](https://github.com/miteshmap/plugin_optional_dependency).

Let's assume that, we have two modules:

- Example Block: Exposes a block plugin.
- Optional Dependency: Has a Service which we require for example block.

Now "Example block" expose a block, and "optional dependency" has a service, which will used by "Example block" when "optional dependency" is installed.

And Here's how **ExampleBlock.php** looks like when we use a OptionalDependency service:

```php
<?php

namespace Drupal\example_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\optional_dependency\OptionalDependency;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Block(
 *   id = "example_block",
 *   admin_label = @Translation("Example block"),
 * )
 */

class ExampleBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   *
   * @var \Drupal\example_block\ExampleBlockService
   */
  protected $exampleBlockService;

  /**
   * Creates a ExampleBlock instance.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\optional_dependency\OptionalDependency
   *   The optional dependency.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, OptionalDependency $optionalDependency) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->optionalDependency = $optionalDependency;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('optional_dependency.demo')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    $text = $this->t('Default text');
    // use only if the optional dependency service is available.
    if ($this->optionalDependency instanceof OptionalDependency) {
      $text = $this->optionalDependency->getCurrentPath();
    }

    $build['site_name'] = [
      '#markup' => $text,
    ];

    return $build;
  }

}
```

Here's the service exposed by "Optional dependency" module: **OptionalDependency.php**

```php
<?php

namespace Drupal\optional_dependency;

use Drupal\Core\Path\CurrentPathStack;

/**
 * Optional dependency
 */
class OptionalDependency {

  /**
   * The current path service.
   *
   * @var \Drupal\Core\Path\CurrentPathStack
   */
  protected $currentPath;

  /**
   * Constructs a OptionalDependency object.
   *
   * @param \Drupal\Core\Path\CurrentPathStack $current_path
   *   The current path.
   */
  public function __construct(CurrentPathStack $current_path) {
    $this->currentPath = $current_path;
  }

  /**
   * This can be any function you required.
   * for example I wrote a function to return current page's path.
   *
   * @return string
   *   Returns the current path.
   */
  public function getCurrentPath() {
    return $this->currentPath->getPath();
  }

}

```

But, the block will definitely throw an error, because the service is not available, till the "Optional dependency" module enabled.

As a solution to this, I came up with an idea of creating a new service class, Which will set optional dependency service object when available, we can use setter and getter methods here.

For which, I defined a service in "Example block" module: **example_block.services.yml**

```yaml
services:
  example_block.service:
    class: Drupal\example_block\ExampleBlockService
    calls:
      - [setOptionalDependency, ["@?optional_dependency.demo"]]
```

And the class file: **ExampleBlockServcie.php**

```php
<?php

namespace Drupal\example_block;

use Drupal\optional_dependency\OptionalDependency;

/**
 * System Manager Service.
 */
class ExampleBlockService {


  private $optionalDependency;

  /**
   * Sets optional dependency
   *
   * @param \Drupal\optional_dependency\OptionalDependency
   *   The optional dependency.
   *
   * @return $this
   */
  public function setOptionalDependency(OptionalDependency $optionalDependency) {
    $this->optionalDependency = $optionalDependency;
    return $this;
  }

  public function getOptionalDependency() {
    if (isset($this->optionalDependency) && $this->optionalDependency instanceof OptionalDependency) {
      return $this->optionalDependency;
    }
    return NULL;
  }

}
```

And finally we have to do changes in ExampleBlock, to make it work with and without "optional dependency" module.

Here's the new **ExampleBlock.php**

```php
<?php

namespace Drupal\example_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\example_block\ExampleBlockService;
use Drupal\optional_dependency\OptionalDependency;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Block(
 *   id = "example_block",
 *   admin_label = @Translation("Example block"),
 * )
 */

class ExampleBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   *
   * @var \Drupal\example_block\ExampleBlockService
   */
  protected $exampleBlockService;

  /**
   * Creates a ExampleBlock instance.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\example_block\ExampleBlockService $example_block
   *   The Example block service objects.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ExampleBlockService $example_block) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->exampleBlockService = $example_block;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('example_block.service')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    $text = $this->t('Default text');
    $optionaDependency = $this->exampleBlockService->getOptionalDependency();
    if ($optionaDependency instanceof OptionalDependency) {
      $text = $optionaDependency->getCurrentPath();
    }

    $build['site_name'] = [
      '#markup' => $text,
    ];

    return $build;
  }

}
```

wooohoooo !! The ExampleClass is working in both conditions, With and without "optional Dependency".

I know it's too much to go through. But, in summary it's all about creating one extra service. It will resolve the issue of hard dependency, and you can use this services any where in any plugins / controller.

## summary:

First thing is to fix architecture issue. Whenever you require a dependency injection in plugin or controller make sure you create a service, in a module, from where it will always available for other modules to use.

And incase, if you fall into a situation like I have, Where a module exposes a services and that can be utilised by other module, but the module with service is not always enabled.

Create a new services in a module which is always enable and use optional dependency injection in that service with setter and getter methods.
