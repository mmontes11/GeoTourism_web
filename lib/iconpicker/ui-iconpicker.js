/**
 * ui-iconpicker
 *
 * @version   v0.1.4
 * @author    Justin Lau <justin@tclau.com>
 * @copyright Copyright (c) 2014 Justin Lau <justin@tclau.com>
 * @license   The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function () {
    var umd;

    umd = function (root, factory) {
        if (typeof define === "function" && (define.amd != null)) {
            return define("values/icon-groups-map", ["angular"], factory);
        } else {
            return factory(root.angular);
        }
    };

    umd(this, function (angular) {
        var module;
        module = angular.module("ui-iconpicker/values/icon-groups-map", [])
        var fontAwesomeIcons = [
            "map-marker","university", "leaf", "bed", "cutlery", "beer", "glass","anchor",
            "automobile","bus","plane","rocket","ship","subway","taxi","truck",
            "eur","usd","bitcoin",
            "bell-o","camera-retro","bullhorn", "bug","coffee","flag","gamepad","info","road","recycle","wheelchair",
            "cogs","microphone","wifi","warning","phone","shopping-cart"
        ];
        return module.value("iconGroupsMap", {
            "bootstrap": {
                prefix: "glyphicon glyphicon-",
                classes: ["asterisk", "plus", "euro", "minus", "cloud", "envelope", "pencil", "glass", "music", "search", "heart", "star", "star-empty", "user", "film", "th-large", "th", "th-list", "ok", "remove", "zoom-in", "zoom-out", "off", "signal", "cog", "trash", "home", "file", "time", "road", "download-alt", "download", "upload", "inbox", "play-circle", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "indent-left", "indent-right", "facetime-video", "picture", "map-marker", "adjust", "tint", "edit", "share", "check", "move", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-sign", "minus-sign", "remove-sign", "ok-sign", "question-sign", "info-sign", "screenshot", "remove-circle", "ok-circle", "ban-circle", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "share-alt", "resize-full", "resize-small", "exclamation-sign", "gift", "leaf", "fire", "eye-open", "eye-close", "warning-sign", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder-close", "folder-open", "resize-vertical", "resize-horizontal", "hdd", "bullhorn", "bell", "certificate", "thumbs-up", "thumbs-down", "hand-right", "hand-left", "hand-up", "hand-down", "circle-arrow-right", "circle-arrow-left", "circle-arrow-up", "circle-arrow-down", "globe", "wrench", "tasks", "filter", "briefcase", "fullscreen", "dashboard", "paperclip", "heart-empty", "link", "phone", "pushpin", "usd", "gbp", "sort", "sort-by-alphabet", "sort-by-alphabet-alt", "sort-by-order", "sort-by-order-alt", "sort-by-attributes", "sort-by-attributes-alt", "unchecked", "expand", "collapse-down", "collapse-up", "log-in", "flash", "log-out", "new-window", "record", "save", "open", "saved", "import", "export", "send", "floppy-disk", "floppy-saved", "floppy-remove", "floppy-save", "floppy-open", "credit-card", "transfer", "cutlery", "header", "compressed", "earphone", "phone-alt", "tower", "stats", "sd-video", "hd-video", "subtitles", "sound-stereo", "sound-dolby", "sound-5-1", "sound-6-1", "sound-7-1", "copyright-mark", "registration-mark", "cloud-download", "cloud-upload", "tree-conifer", "tree-deciduous"]
            },
            "font-awesome": {
                prefix: "fa fa-",
                classes: fontAwesomeIcons
            }
        });
    });

}).call(this);

(function () {
    var umd;

    umd = function (root, factory) {
        if (typeof define === "function" && (define.amd != null)) {
            return define("services/IconGroupCollection", ["angular", "values/icon-groups-map"], factory);
        } else {
            return factory(root.angular);
        }
    };

    umd(this, function (angular) {
        var module;
        module = angular.module("ui-iconpicker/services/IconGroupCollection", ["ui-iconpicker/values/icon-groups-map"]);
        return module.factory("IconGroupCollection", [
            "iconGroupsMap", function (iconGroupsMap) {
                var IconGroupCollection;
                return IconGroupCollection = (function () {
                    function IconGroupCollection(groupIdLiteral) {
                        if (groupIdLiteral == null) {
                            groupIdLiteral = "bootstrap";
                        }
                        this.iconGroupsMap = {};
                        this.includeGroups(groupIdLiteral);
                    }

                    IconGroupCollection.prototype.filterByGroups = function (groupIdLiteral) {
                        var group, groupId, groupIds, _ref;
                        if (groupIdLiteral == null) {
                            groupIdLiteral = "bootstrap";
                        }
                        if (groupIdLiteral !== "all") {
                            groupIds = groupIdLiteral.split(" ");
                            _ref = this.iconGroupsMap;
                            for (groupId in _ref) {
                                group = _ref[groupId];
                                if (groupIds.indexOf(groupId) !== -1) {
                                    delete this.iconGroupsMap[groupId];
                                }
                            }
                        }
                        return this;
                    };

                    IconGroupCollection.prototype.includeGroups = function (groupIdLiteral) {
                        var group, groupId, groupIds;
                        if (groupIdLiteral == null) {
                            groupIdLiteral = "bootstrap";
                        }
                        groupIds = groupIdLiteral.split(" ");
                        for (groupId in iconGroupsMap) {
                            group = iconGroupsMap[groupId];
                            if (this.iconGroupsMap[groupId] == null) {
                                if (groupIdLiteral === "all" || groupIds.indexOf(groupId) !== -1) {
                                    this.iconGroupsMap[groupId] = group;
                                }
                            }
                        }
                        return this;
                    };

                    IconGroupCollection.prototype.getClassArray = function () {
                        var classes, group, iconClass, id, _i, _len, _ref, _ref1;
                        classes = [];
                        _ref = this.iconGroupsMap;
                        for (id in _ref) {
                            group = _ref[id];
                            _ref1 = group.classes;
                            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                                iconClass = _ref1[_i];
                                classes.push(group.prefix + iconClass);
                            }
                        }
                        return classes;
                    };

                    return IconGroupCollection;

                })();
            }
        ]);
    });

}).call(this);

(function () {
    var umd;

    umd = function (root, factory) {
        if (typeof define === "function" && (define.amd != null)) {
            return define("templates/iconpicker", ["angular", "angular-bootstrap"], factory);
        } else {
            return factory(root.angular);
        }
    };

    umd(this, function (angular) {
        var module;
        module = angular.module("ui-iconpicker/templates/iconpicker", ["ui.bootstrap"]);
        return module.run([
            "$templateCache", function ($templateCache) {
                return $templateCache.put("templates/iconpicker.html", "<span class=\"btn-group ui-iconpicker\" ng-class=\"{ disabled: disabled }\">\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\"><i class=\"{{ iconClass }}\"></i><span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\">\n		<li ng-repeat=\"class in availableIconClasses\">\n			<button class=\"btn btn-default\" type=\"button\" ng-click=\"$parent.iconClass = class\"><span class=\"{{ class }}\"></span></button>\n		</li>\n	</ul>\n	<input name=\"{{ name }}\" type=\"hidden\" value=\"{{ iconClass }}\" ng-if=\"name\" />\n</span>");
            }
        ]);
    });

}).call(this);

(function () {
    var umd;

    umd = function (root, factory) {
        if (typeof define === "function" && (define.amd != null)) {
            return define("directives/ui-iconpicker", ["angular", "services/IconGroupCollection", "templates/iconpicker"], factory);
        } else {
            return factory(root.angular);
        }
    };

    umd(this, function (angular) {
        var module;
        module = angular.module("ui-iconpicker/directives/ui-iconpicker", ["ui-iconpicker/services/IconGroupCollection", "ui-iconpicker/templates/iconpicker"]);
        return module.directive("uiIconpicker", [
            "IconGroupCollection", function (IconGroupCollection) {
                return {
                    replace: true,
                    restrict: "E",
                    scope: {
                        name: "@",
                        model: "=?ngModel"
                    },
                    templateUrl: "templates/iconpicker.html",
                    link: function ($scope, $element, attrs) {
                        var _ref;
                        $scope.availableIconClasses = (new IconGroupCollection(attrs.groups)).getClassArray();
                        $scope.iconClass = (_ref = attrs.value) != null ? _ref : $scope.availableIconClasses[0];
                        if (attrs.ngModel) {
                            $scope.model = $scope[attrs.ngModel];
                            $scope.$watch("iconClass", function () {
                                return $scope.model = $scope.iconClass;
                            });
                            $scope.$watch("model", function () {
                                return $scope.iconClass = $scope.model;
                            });
                        }
                        $scope.$dropdownButton = $element.find("button").eq(0);
                        return $scope.disabled = attrs.disabled != null;
                    }
                };
            }
        ]);
    });

}).call(this);

(function () {
    var umd;

    umd = function (root, factory) {
        if (typeof define === "function" && (define.amd != null)) {
            return define("ui-iconpicker", ["angular", "directives/ui-iconpicker"], factory);
        } else {
            return factory(root.angular);
        }
    };

    umd(this, function (angular) {
        return angular.module("ui-iconpicker", ["ui-iconpicker/directives/ui-iconpicker"]);
    });

}).call(this);

