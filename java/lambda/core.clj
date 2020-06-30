(ns lambda.core
  (:require [clojure.java.io :as io]
            [cognitect.aws.client.api :as aws]
            [cheshire.core :as json]))

(def s3 (aws/client {:api :s3}))

(def bucket (System/getenv "BUCKET_NAME"))

(defn read-s3-content [bucket file]
  (-> (aws/invoke s3 {:op :GetObject :request {:Bucket bucket
                                               :Key file}})
      (:Body)))

(defn -handler
  [in out ctx]
  (let [event (json/parse-stream (io/reader in) true)]
    (println "Got the following event: " (pr-str event))
    (with-open [w (io/writer out)]
      (io/copy (read-s3-content bucket "hello.json") w))))

(defn help
  "Just a dummy function to use from a test"
  []
  (get (aws/ops s3) :GetObject))

(comment
  (aws/ops s3)
  (aws/validate-requests s3 true)
  (aws/doc s3 :GetObject)
  (let [bucket "hellostack-bucket83908e77-1ihbe4gxlcd98"] ;; your bucket will be different
    (aws/invoke s3 {:op :GetObject :request {:Bucket bucket
                                             :Key "hello.json"}})))

