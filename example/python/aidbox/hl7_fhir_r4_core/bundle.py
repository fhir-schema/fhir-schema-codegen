# WARNING: This file is autogenerated by FHIR Schema Codegen.
# https://github.com/fhir-schema/fhir-schema-codegen
# Any manual changes made to this file may be overwritten.

from __future__ import annotations
from pydantic import *
from typing import Optional, List as L, Literal

from .base import *
from .resource import Resource


class BundleLink(BackboneElement):
    relation: Optional[str] = None
    url: Optional[str] = None

class BundleEntrySearch(BackboneElement):
    mode: Optional[Literal["match", "include", "outcome"]] = None
    score: Optional[float] = None

class BundleEntryRequest(BackboneElement):
    if_match: Optional[str] = None
    if_modified_since: Optional[str] = None
    if_none_exist: Optional[str] = None
    if_none_match: Optional[str] = None
    method: Optional[Literal["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"]] = None
    url: Optional[str] = None

class BundleEntryResponse(BackboneElement):
    etag: Optional[str] = None
    last_modified: Optional[str] = None
    location: Optional[str] = None
    outcome: Optional[Resource] = None
    status: Optional[str] = None

class BundleEntry(BackboneElement):
    full_url: Optional[str] = None
    link: Optional[L[BundleLink]] = None
    request: Optional[BundleEntryRequest] = None
    resource: Optional[Resource] = None
    response: Optional[BundleEntryResponse] = None
    search: Optional[BundleEntrySearch] = None


class Bundle(Resource):
    entry: Optional[L[BundleEntry]] = None
    identifier: Optional[Identifier] = None
    link: Optional[L[BundleLink]] = None
    signature: Optional[Signature] = None
    timestamp: Optional[str] = None
    total: Optional[int] = None
    type: Optional[Literal["document", "message", "transaction", "transaction-response", "batch", "batch-response", "history", "searchset", "collection"]] = None

