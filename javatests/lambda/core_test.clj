(ns lambda.core-test
  (:require [clojure.test :refer :all]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [lambda.core :as lambda])
  (:import (java.io PushbackReader)))

(deftest handle-event
  (with-open [in (io/reader (io/resource "lambda/expected.edn"))]
    (is (= (edn/read (PushbackReader. in)) (lambda/help)))))
